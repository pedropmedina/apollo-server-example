const merge = require('lodash/merge');

const bookshelf = require('./bookshelf');
const volume = require('./volume');
const search = require('./search');
const user = require('./user');

module.exports = {
	typeDefs: [
		user.typeDefs,
		bookshelf.typeDefs,
		volume.typeDefs,
		search.typeDefs,
	].join(' '),

	resolvers: merge(
		{},
		user.resolvers,
		bookshelf.resolvers,
		volume.resolvers,
		search.resolvers,
	),
};
