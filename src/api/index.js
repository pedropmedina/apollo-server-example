const merge = require('lodash/merge');

const bookshelf = require('./bookshelf');
const volume = require('./volume');
const search = require('./search');
const user = require('./user');
const group = require('./group');

module.exports = {
	typeDefs: [
		user.typeDefs,
		bookshelf.typeDefs,
		volume.typeDefs,
		search.typeDefs,
		group.typeDefs,
	].join(' '),

	resolvers: merge(
		{},
		user.resolvers,
		bookshelf.resolvers,
		volume.resolvers,
		search.resolvers,
		group.resolvers,
	),

	context: ({ request }) => ({
		models: {
			group: group.model,
			user: user.model,
		},
	}),
};
