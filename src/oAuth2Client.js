const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID);

// set auth globally
google.options({
	auth: oAuth2Client,
});

module.exports = oAuth2Client;
