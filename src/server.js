const { GraphQLServer } = require('graphql-yoga');

const { oAuth2Client, authenticateClient } = require('./oAuth2Client');

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

// express middlewares
server.express.use('/auth', async (req, res, next) => {
	// This library will automatically obtain an access_token,
	// and automatically refresh the access_token if a refresh_token is present.
	// The refresh_token is only returned on the first authorization
	const code = req.query.code;
	const { tokens } = await oAuth2Client.getToken(code);
	oAuth2Client.setCredentials(tokens);

	fs.writeFile('tokens.json', JSON.stringify(tokens), err => {
		if (err) throw err;
		console.log('tokens were saved!');
	});

	next();
});

// start server
server.start(options, ({ port }) => {
	console.log(`🚀 Server is up on port ${port}`);
});
