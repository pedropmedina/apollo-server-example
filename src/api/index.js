const merge = require('lodash/merge');

const book = require('./book');
const user = require('./user');

module.exports = {
	typeDefs: [user.typeDefs, book.typeDefs].join(' '),
	resolvers: merge({}, user.resolvers, book.resolvers),
};
