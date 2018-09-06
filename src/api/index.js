const merge = require('lodash/merge');

const bookshelf = require('./bookshelf');
const volume = require('./volume');
const user = require('./user');

module.exports = {
	typeDefs: [user.typeDefs, bookshelf.typeDefs, volume.typeDefs].join(' '),
	resolvers: merge({}, user.resolvers, bookshelf.resolvers, volume.resolvers),
};
