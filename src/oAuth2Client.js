const { google } = require('googleapis');

const clientId =
	'579012218555-5b5eq8atbcbkv7h6q8fafqj86od1ot5m.apps.googleusercontent.com';

const oAuth2Client = new google.auth.OAuth2(clientId);

// set auth globally
google.options({
	auth: oAuth2Client,
});

module.exports = oAuth2Client;
