const merge = require('lodash/merge');

const bookshelf = require('./bookshelf');
const volume = require('./volume');
const search = require('./search');
const user = require('./user');
const group = require('./group');
const note = require('./note');

const loaders = require('./loaders');

module.exports = {
	typeDefs: [
		bookshelf.typeDefs,
		volume.typeDefs,
		search.typeDefs,
		user.typeDefs,
		group.typeDefs,
		note.typeDefs,
	].join(' '),

	resolvers: merge(
		{},
		bookshelf.resolvers,
		volume.resolvers,
		search.resolvers,
		user.resolvers,
		group.resolvers,
		note.resolvers,
	),

	context: ({ req }) => ({
		req,
		models: {
			user: user.model,
			group: group.model,
			note: note.model,
		},
		loaders: loaders(req),
	}),
};
