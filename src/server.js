require('dotenv').config();

const { ApolloServer } = require('apollo-server');

require('./db')();

const graphQLConfig = require('./api');

const server = new ApolloServer(graphQLConfig);

server.listen({ port: process.env.PORT }).then(({ url }) => {
	console.log(`🚀  Server is up at ${url}`);
});
