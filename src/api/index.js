const merge = require('lodash/merge');

const book = require('./book');

module.exports = {
	typeDefs: [book.typeDefs].join(' '),
	resolvers: merge({}, book.resolvers),
};
