const { ApolloServer } = require('apollo-server');

require('./db')('mongodb://localhost:27017/books');

const graphQLConfig = require('./api');

const server = new ApolloServer(graphQLConfig);

server.listen({ port: 5000 }).then(({ url }) => {
	console.log(`🚀  Server is up at ${url}`);
});

// ------------------------------------------------------------------
// Configuration setting for Graphql files
// 1. Install extendion grapql for visual studios
// 2. install as a --dev dependency @playlyfe/gql -> https://www.npmjs.com/package/@playlyfe/gql
// 3. add .gqlconfig to root dir and configure as explained in site above
// 4. REQUIRED: Install watchman in machine and cd into
// current project root directory and run watchman watch-project .
// READ MORE: https://facebook.github.io/watchman/docs/install.html
