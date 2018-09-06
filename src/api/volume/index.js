module.exports = {
	typeDefs: require('../../utils/graphqlLoader')('volume/volume.graphql'),
	resolvers: require('./volume.resolvers'),
};
