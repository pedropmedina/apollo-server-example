const { google } = require('googleapis');

const { oAuth2Client } = require('../../oAuth2Client');

const User = require('./user.model');

const oauth2 = google.oauth2('v2');

const signIn = async (root, args, ctx, info) => {
	// Verifies id_token from signed in user with following verifications:
	// 1. The id_token is properly signed by Google
	// 2. The value of the aud equals one of app's client IDs
	// 3. The value of iss equals accounts.google.com
	// 4. Check the exp of token has not passed.
	const verification = await oAuth2Client.verifyIdToken({
		idToken: args.idToken,
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
			console.log('user found => ', foundUser);
			return;
		} else {
			const createdUser = await User.create(user);
			console.log(createdUser);
			return;
		}
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = {
	Mutation: {
		signIn,
	},
};
