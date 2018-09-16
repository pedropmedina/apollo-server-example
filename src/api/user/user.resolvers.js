const oAuth2Client = require('../../oAuth2Client');

const signIn = async (root, { input }, ctx, info) => {
	// Verifies id_token from signed in user with following verifications:
	// 1. The id_token is properly signed by Google
	// 2. The value of the aud equals one of app's client IDs
	// 3. The value of iss equals accounts.google.com
	// 4. Check the exp of token has not passed.
	const verification = await oAuth2Client.verifyIdToken({
		idToken: ctx.req.headers.authorization,
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
		const foundUser = await ctx.models.user.findOne({ userId: user.userId });

		if (foundUser) {
			oAuth2Client.setCredentials({
				access_token: input.accessToken,
			});

			return foundUser;
		} else {
			oAuth2Client.setCredentials({
				access_token: input.accessToken,
			});

			const newUser = await ctx.models.user.create(user);

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
