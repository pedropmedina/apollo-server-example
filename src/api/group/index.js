module.exports = {
	typeDefs: require('../../utils/graphqlLoader')('group/group.gql'),
	resolvers: require('./group.resolvers'),
	model: require('./group.model'),
};
