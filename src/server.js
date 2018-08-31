const { ApolloServer, gql } = require('apollo-server');

// local data to be fetched by graphql
const books = [
	{
		title: 'Harry Potter and the Chamber of Secrets',
		author: 'J.K. Rowling',
	},
	{
		title: 'Jurissic Park',
		author: 'Michael Crichton',
	},
];

// type definitions
const typeDefs = gql`
	type Book {
		title: String
		author: String
	}

	type Query {
		books: [Book]
	}
`;

// resolvers
const resolvers = {
	Query: {
		books: () => books,
	},
};

// Avoid graphql-playground invisible cursor issue
// https://github.com/prisma/graphql-playground/issues/790
const playground = {
	settings: {
		'editor.cursorShape': 'line',
	},
};

// The apollo server can be started by passing the typeDefs and the resolvers
const server = new ApolloServer({ typeDefs, resolvers, playground });

server.listen({ port: process.env.PORT || 5000 }).then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});

// Both the graphql-playground and the graphql request are send
// to the same '/' endpoint. GET requests from the browser
// are only going to receive the graphql-playground, whereas,
// request to graphql are independent and will be directed to '/'
// Furthermore, Apollo will disable graphql-playground during production
