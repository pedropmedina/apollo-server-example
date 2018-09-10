module.exports = {
	typeDefs: require('../../utils/graphqlLoader')('note/note.gql'),
	resolvers: require('./note.resolvers'),
	model: require('./note.model'),
};
