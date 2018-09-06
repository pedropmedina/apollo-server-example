module.exports = {
	typeDefs: require('../../utils/graphqlLoader')('user/user.gql'),
	resolvers: require('./user.resolvers'),
};
