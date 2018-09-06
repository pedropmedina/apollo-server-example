const { GraphQLServer } = require('graphql-yoga');
const fs = require('fs');

const { oAuth2Client, signupClient, loginClient } = require('./oAuth2Client');

require('./db')('mongodb://localhost:27017/books');

const graphQLConfig = require('./api');

const options = {
	port: 5000,
	endpoint: '/graphql',
	playground: '/playground',
};

const server = new GraphQLServer(graphQLConfig);

module.exports = server;

server.express.get('/signup', async (req, res, next) => {
	const code = await req.query.code;
	const { tokens } = await oAuth2Client.getToken(code);
	next();

	// save tokens locally for development
	fs.writeFile('tokens.json', JSON.stringify(tokens), err => {
		if (err) throw err;
		console.log('tokens were saved!');
	});
});

server.start(options, ({ port }) => {
	console.log(`🚀  Server is up on port ${port}`);
	// signupClient();
});

/**
 * singup with Google
 * 		1. user clicks singup button at '/signup'
 * 		2. user is shown the consent form
 * 		3. user is redirected to '/signup'
 * 		4. save refresh_token to db
 * 		5. make call to get user's profile and save to db
 * 		6. send user to home page
 *
 * login with Google
 * 		1. user clicks login button at '/login'
 * 		2. user is provided with 'code' in query
 * 		3. oAuth2Client.verifyToken(token)
 * 		4. check our db for matching email address
 * 		5. set_credentials with refresh_token from db
 * 		6. send user to homepage
 */

// Configuration setting for Graphql files
// 1. Install extendion grapql for visual studios
// 2. install as a --dev dependency @playlyfe/gql -> https://www.npmjs.com/package/@playlyfe/gql
// 3. add .gqlconfig to root dir and configure as explained in site above
// 4. REQUIRED: Install watchman in machine and cd into
// current project root directory and run watchman watch-project .
// READ MORE: https://facebook.github.io/watchman/docs/install.html
