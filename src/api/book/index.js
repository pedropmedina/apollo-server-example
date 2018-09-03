module.exports = {
	typeDefs: require('../../utils/graphqlLoader')('book/book.graphql'),
	resolvers: require('./book.resolvers').resolvers,
};
