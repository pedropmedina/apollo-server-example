const merge = require('lodash/merge');
const { SchemaDirectiveVisitor } = require('graphql-tools');

const bookshelf = require('./bookshelf');
const volume = require('./volume');
const search = require('./search');
const user = require('./user');
const group = require('./group');
const note = require('./note');

// Implementing deprecated directive
class DeprecatedDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		field.isDeprecated = true;
		field.deprecationReason = this.args.reason;
	}

	visitEnumValue(value) {
		value.isDeprecated = true;
		value.deprecationReason = this.args.reason;
	}
}

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

	context: ({ request }) => ({
		models: {
			user: user.model,
			group: group.model,
			note: note.model,
		},
	}),

	schemaDirectives: {
		deprecated: DeprecatedDirective,
	},
};
