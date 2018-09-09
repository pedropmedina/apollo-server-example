const { google } = require('googleapis');

const { oAuth2Client } = require('../../oAuth2Client');

const User = require('./user.model');

const oauth2 = google.oauth2('v2');

const signin = async (root, args, ctx, info) => {
	// const userInfo = await oauth2.userinfo.get();
	// console.log(userInfo.data);

	// console.log(args.idToken);

	const ticket = await oAuth2Client.verifyIdToken({
		idToken: args.idToken,
	});
	const payload = ticket.getPayload();
	console.log(payload);
};

module.exports = {
	Mutation: {
		signin,
	},
};
