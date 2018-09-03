const merge = require('lodash/merge');

const book = require('./book');
const user = require('./user');

module.exports = {
	typeDefs: [book.typeDefs, user.typeDefs].join(' '),
	resolvers: merge({}, book.resolvers, user.resolvers),
};
