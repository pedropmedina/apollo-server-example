const { google } = require('googleapis');

const oauth2 = google.oauth2('v2');

const signin = async (root, args, ctx, info) => {
	const userInfo = await oauth2.userinfo.get();
	console.log(userInfo.data);
};

module.exports = {
	Query: {
		signin,
	},
};
