module.exports = {
	typeDefs: require('../../utils/graphqlLoader')('bookshelf/bookshelf.gql'),
	resolvers: require('./bookshelf.resolvers'),
};
