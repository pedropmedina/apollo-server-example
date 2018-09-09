const mongoose = require('mongoose');
const { Schema } = mongoose;

// (node:31357) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
// read more: https://github.com/Automattic/mongoose/issues/6890
mongoose.set('useCreateIndex', true);

const schema = {
	userId: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	givenName: {
		type: String,
		required: true,
	},
	familyName: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	picture: {
		type: String,
	},
	isAdmin: {
		type: Boolean,
	},
};

const userSchema = new Schema(schema, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
