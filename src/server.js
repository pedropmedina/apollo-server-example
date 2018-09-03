const { GraphQLServer } = require('graphql-yoga');
const fs = require('fs');

// oAuth2 instance from user.resolver
const { oAuth2Client } = require('./api/user/user.resolvers');

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

server.start(options, ({ port }) => {
	console.log(`🚀 Server is up on port ${port}`);
});

// References:
// https://medium.com/@pablo127/google-api-authentication-with-oauth-2-on-the-example-of-gmail-a103c897fd98

// https://github.com/google/google-auth-library-nodejs

// // Google Oauth2 ------------------- Start
// const getAuthenticatedClient = () => {
// 	return new Promise((resolve, reject) => {
// 		const oAuth2Client = new OAuth2Client(
// 			keys.web.client_id,
// 			keys.web.client_secret,
// 			keys.web.redirect_uris[0],
// 		);

// 		const authorizeUrl = oAuth2Client.generateAuthUrl({
// 			access_type: 'offline',
// 			scope: 'https://www.googleapis.com/auth/books',
// 		});

// 		opn(authorizeUrl);

// 		server.express.use('/auth', async (req, res, next) => {
// 			const code = req.query.code;

// 			// With the presence of the code we go ahead and obtain the token
// 			const { tokens } = await oAuth2Client.getToken(code);
// 			oAuth2Client.setCredentials(tokens);
// 			resolve(oAuth2Client);
// 			next();
// 		});
// 	});
// };

// const main = async () => {
// 	try {
// 		const oAuth2Client = await getAuthenticatedClient();
// 		const url = 'https://www.googleapis.com/books/v1/mylibrary/bookshelves';
// 		const res = await oAuth2Client.request({ url });
// 		console.log(res.data);
// 	} catch (error) {
// 		console.log('error => ', error);
// 	}
// };
// // Google Oauth2 ------------------- End
