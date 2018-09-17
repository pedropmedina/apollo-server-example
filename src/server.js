const { ApolloServer } = require('apollo-server');

require('./db')('mongodb://localhost:27017/books');

const graphQLConfig = require('./api');

const server = new ApolloServer(graphQLConfig);

server.listen({ port: 5000 }).then(({ url }) => {
	console.log(`🚀  Server is up at ${url}`);
});
