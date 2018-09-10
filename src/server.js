const { GraphQLServer } = require('graphql-yoga');
const fs = require('fs');

require('./db')('mongodb://localhost:27017/books');

const graphQLConfig = require('./api');

const options = {
	port: 5000,
	endpoint: '/graphql',
	playground: '/playground',
};

const server = new GraphQLServer(graphQLConfig);

module.exports = server;

server.start(options, ({ port }) => {
	console.log(`🚀  Server is up on port ${port}`);
});

// ------------------------------------------------------------------
// Configuration setting for Graphql files
// 1. Install extendion grapql for visual studios
// 2. install as a --dev dependency @playlyfe/gql -> https://www.npmjs.com/package/@playlyfe/gql
// 3. add .gqlconfig to root dir and configure as explained in site above
// 4. REQUIRED: Install watchman in machine and cd into
// current project root directory and run watchman watch-project .
// READ MORE: https://facebook.github.io/watchman/docs/install.html
