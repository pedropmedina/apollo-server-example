const { google } = require('googleapis');
const opn = require('opn');
const fs = require('fs');

const keys = require('../keys.json');
const tokens = require('../tokens.json');

// instantiate OAuth2Client
const oAuth2Client = new google.auth.OAuth2(
	'579012218555-5b5eq8atbcbkv7h6q8fafqj86od1ot5m.apps.googleusercontent.com',
	// keys.web.client_id,
	// keys.web.client_secret,
	// keys.web.redirect_uris[0],
);

// set credentials for development
oAuth2Client.setCredentials({
	refresh_token: tokens.refresh_token,
});

// set auth globally
google.options({
	auth: oAuth2Client,
});

// authenticate client on signin
const scopes = [
	'https://www.googleapis.com/auth/userinfo.profile',
	'https://www.googleapis.com/auth/userinfo.email',
	'https://www.googleapis.com/auth/books',
];

const signupClient = () => {
	const authorizeUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: scopes,
		redirect_uri: keys.web.redirect_uris[0],
		prompt: 'consent',
	});

	opn(authorizeUrl);
};

const loginClient = () => {
	const authorizeUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: scopes,
		redirect_uri: keys.web.redirect_uris[1],
	});

	opn(authorizeUrl);
};

// update refresh token when available
oAuth2Client.on('tokens', tokens => {
	if (tokens.refresh_token) {
		console.log('-------------------------------------- ');
		console.log('refresh_token =>>', tokens.refresh_token);
		console.log('-------------------------------------- ');

		fs.readFile('tokens.json', 'utf8', (error, data) => {
			if (error) throw error;
			const parsedTokens = JSON.parse(data);

			const updatedTokens = {
				...parsedTokens,
				refresh_token: tokens.refresh_token,
			};

			fs.writeFile(
				'tokens.json',
				JSON.stringify(updatedTokens),
				(error, data) => {
					if (error) throw error;
					console.log('New refresh_token was saved.');
				},
			);
		});
	} else {
		console.log('-------------------------------------- ');
		console.log('access_token =>>', tokens.access_token);
		console.log('-------------------------------------- ');
	}
});

module.exports = {
	oAuth2Client,
	signupClient,
	loginClient,
};

// OAuth2 will automatically obtain an access_token,
// and automatically refresh the access_token if a refresh_token is present.
// The refresh_token is only returned on the first authorization
// when the consent form is display for user to allow access.
// The consent form will only be displayed once, every other request
// to '/auth' won't prompt the form, only provide the code to get a
// new access_token. This is why the refresh_token must be safe in
// the database
