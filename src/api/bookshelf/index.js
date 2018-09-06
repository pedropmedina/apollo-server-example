module.exports = {
	typeDefs: require('../../utils/graphqlLoader')('bookshelf/bookshelf.graphql'),
	resolvers: require('./bookshelf.resolvers'),
};
