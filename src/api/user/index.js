module.exports = {
	typeDefs: require('../../utils/graphqlLoader')('user/user.graphql'),
	resolvers: require('./user.resolvers'),
};
