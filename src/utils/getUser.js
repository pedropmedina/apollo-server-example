const oAuth2Client = require('../oAuth2Client');

module.exports = async ({ req, User }) => {
	try {
		// get idToken from the headers
		const idToken = req.headers.authorization;

		if (idToken) {
			// verify the idToken
			const verification = await oAuth2Client.verifyIdToken({ idToken });

			// grab the userId from the verfication
			const userId = verification.getUserId();

			// find user in db whose userId property matches that from google
			return await User.findOne({ userId }).exec();
		}

		// if not idToken provided throw error
		throw new Error('User not authenticated');
	} catch (error) {
		console.error(error.message);
	}
};
