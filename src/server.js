const { GraphQLServer } = require('graphql-yoga');
const { OAuth2Client } = require('google-auth-library');
const fs = require('fs');
const opn = require('opn');
const path = require('path');

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

// ----------------------------------------------------- Start
const authenticateClient = () => {
	const oAuth2Client = new OAuth2Client(
		keys.web.client_id,
		keys.web.client_secret,
		keys.web.redirect_uris[0],
	);

	const authorizeUrl = oAuth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: 'https://www.googleapis.com/auth/books',
	});

	opn(authorizeUrl);

	server.express.use('/auth', async (req, res, next) => {
		const code = req.query.code;
		const { tokens } = await oAuth2Client.getToken(code);
		oAuth2Client.setCredentials(tokens);

		// for local development
		fs.writeFile('tokens.json', JSON.stringify(tokens), err => {
			if (err) throw err;
			console.log('tokens were saved!');
		});

		next();
	});
};
// ----------------------------------------------------- End

server.start(options, ({ port }) => {
	console.log(`🚀 Server is up on port ${port}`);

	fs.readFile(path.join(__dirname, '../tokens.json'), 'utf8', (err, data) => {
		if (err) throw err;
		if (!data) {
			authenticateClient();
		} else {
			console.log('Tokens already in file.');
		}
	});
});
