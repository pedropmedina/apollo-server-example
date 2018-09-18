const oAuth2Client = require('../oAuth2Client');

module.exports = async ({ req, User }) => {
	// get idToken from the headers
	const idToken = req.get('authorization');

	if (idToken) {
		// verify the idToken
		const verification = await oAuth2Client.verifyIdToken({ idToken });

		// grab the userId from the verfication
		const userId = verification.getUserId();

		// find user in db whose userId property matches that from google
		const user = await User.findOne({ userId }).exec();

		return user.id;
	}

	throw new Error('Not authenticated!');
};
