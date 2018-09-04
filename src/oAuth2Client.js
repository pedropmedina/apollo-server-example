const { OAuth2Client } = require('google-auth-library');
const opn = require('opn');

const keys = require('../keys.json');
const tokens = require('../tokens.json');

// ----------------------------------------------------- Start
// instantiate OAuth2Client
const oAuth2Client = new OAuth2Client(
	keys.web.client_id,
	keys.web.client_secret,
	keys.web.redirect_uris[0],
);

// authenticate client on signin
const authenticateClient = () => {
	const authorizeUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: 'https://www.googleapis.com/auth/books',
		// prompt: 'consent',
	});

	opn(authorizeUrl);
};

// check token info
const checkToken = async () => {
	try {
		const tokenInfo = await oAuth2Client.getTokenInfo(tokens.access_token);
		console.log('tokenInfo =>>', tokenInfo);
		const isTokenExpired = oAuth2Client.isTokenExpiring(tokens.access_token);
		console.log('isTokenExpired =>> ', isTokenExpired);
	} catch (error) {
		console.log('error =>>', error);
	}
};

// check tokesn event
oAuth2Client.on('tokens', tokens => {
	console.log('------------ called tokens event ------------- ');
	console.log(tokens);
	console.log('------------ called tokens event ------------- ');
});

// ----------------------------------------------------- End

module.exports = {
	oAuth2Client,
	authenticateClient,
};
