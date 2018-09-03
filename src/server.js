const fs = require('fs');
const opn = require('opn');
const path = require('path');
const { google } = require('googleapis');
const { GraphQLServer } = require('graphql-yoga');

const keys = require('../keys.json');

// graphQL configuration from api/index.js
const graphQLConfig = require('./api');

// options for graphql-yoga
const options = {
	port: 5000,
	endpoint: '/graphql',
	playground: '/playground',
};

// instance of graphql graphql-yoga server
const server = new GraphQLServer(graphQLConfig);

const authenticateUser = () => {
	// instantiate OAuth2
	const oAuth2Client = new google.auth.OAuth2(
		keys.web.client_id,
		keys.web.client_secret,
		keys.web.redirect_uris[0],
	);

	// generate authorization url for granting permission
	const authorizeUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		// scope can be a string or array in case of more than one
		scope: 'https://www.googleapis.com/auth/books',
	});

	// for local testing purpose, open permission url on browser.
	// To be handle from Front-end once I develop application
	opn(authorizeUrl);

	// Run express middeware to on /auth to extract code and access token
	// This is only going to run upon user's signin
	server.express.use('/auth', async (req, res, next) => {
		const code = req.query.code;
		const { tokens } = await oAuth2Client.getToken(code);
		oAuth2Client.setCredentials(tokens);

		// set Authorization on context for access throughout app
		// server.context = { Authorization: tokens };
		fs.writeFile('tokens.json', JSON.stringify(tokens), err => {
			if (err) throw err;
			console.log('tokens were saved!');
		});

		next();
	});
};

server.start(options, ({ port }) => {
	console.log(`🚀 Server is up on port ${port}`);

	fs.readFile(path.join(__dirname, '../tokens.json'), 'utf8', (err, data) => {
		if (err) throw err;
		if (!JSON.parse(data)) authenticateUser();
	});
});
