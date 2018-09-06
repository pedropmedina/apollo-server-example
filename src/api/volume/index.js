module.exports = {
	typeDefs: require('../../utils/graphqlLoader')('volume/volume.gql'),
	resolvers: require('./volume.resolvers'),
};
