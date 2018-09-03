const { google } = require('googleapis');
const opn = require('opn');

const keys = require('../../keys.json');

// instantiate OAuth2
const oAuth2Client = new google.auth.OAuth2(
	keys.web.client_id,
	keys.web.client_secret,
	keys.web.redirect_uris[0],
);

const signin = (root, args, ctx, info) => {
	// generate authorization url for granting permission
	const authorizeUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		// scope can be a string or array in case of more than one
		scope: 'https://www.googleapis.com/auth/books',
	});

	// for local testing purpose, open permission url on browser.
	// To be handle from Front-end once I develop application
	opn(authorizeUrl);

	return 'Sucessfull signin!';
};

module.exports = {
	oAuth2Client,
	resolvers: {
		Query: {
			signin,
		},
	},
};
