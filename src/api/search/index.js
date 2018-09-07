module.exports = {
	typeDefs: require('../../utils/graphqlLoader')('search/search.gql'),
	resolvers: require('./search.resolvers'),
};
