const { google } = require('googleapis');
const opn = require('opn');

const keys = require('../keys.json');
const tokens = require('../tokens.json');

// instantiate OAuth2Client
const oAuth2Client = new google.auth.OAuth2(
	keys.web.client_id,
	keys.web.client_secret,
	keys.web.redirect_uris[0],
);

// set credentials for development
oAuth2Client.setCredentials(tokens);

// set auth globally
google.options({
	auth: oAuth2Client,
});

// authenticate client on signin
const scopes = [
	'https://www.googleapis.com/auth/userinfo.profile',
	'https://www.googleapis.com/auth/books',
];

const authenticateClient = () => {
	const authorizeUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: scopes,
		// prompt: 'consent',
	});

	opn(authorizeUrl);
};

// check tokesn event
oAuth2Client.on('tokens', tokens => {
	if (tokens.refresh_token) {
		console.log('-------------------------------------- ');
		console.log('refresh_token =>>', tokens.refresh_token);
		console.log('-------------------------------------- ');
	} else {
		console.log('-------------------------------------- ');
		console.log('access_token =>>', tokens.access_token);
		console.log('-------------------------------------- ');
	}
});

module.exports = {
	oAuth2Client,
	authenticateClient,
};
