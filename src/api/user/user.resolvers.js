const { google } = require('googleapis');

const User = require('./user.model');

const clientId =
	'579012218555-5b5eq8atbcbkv7h6q8fafqj86od1ot5m.apps.googleusercontent.com';

const client = new google.auth.OAuth2(clientId);

// set auth globally
google.options({
	auth: client,
});

const signIn = async (root, { input }, ctx, info) => {
	// Verifies id_token from signed in user with following verifications:
	// 1. The id_token is properly signed by Google
	// 2. The value of the aud equals one of app's client IDs
	// 3. The value of iss equals accounts.google.com
	// 4. Check the exp of token has not passed.
	const verification = await client.verifyIdToken({
		idToken: input.idToken,
		audience: clientId,
	});
	const payload = verification.getPayload();

	const { sub, name, given_name, family_name, email, picture } = payload;

	const user = {
		userId: sub,
		name,
		givenName: given_name,
		familyName: family_name,
		email,
		picture,
	};

	try {
		const foundUser = await User.findOne({ userId: user.userId });

		if (foundUser) {
			client.setCredentials({
				access_token: input.accessToken,
			});

			return foundUser;
		} else {
			client.setCredentials({
				access_token: input.accessToken,
			});

			const newUser = await User.create(user);

			return newUser;
		}
	} catch (error) {
		console.error(error.message);
	}
};

module.exports = {
	Mutation: {
		signIn,
	},
};
