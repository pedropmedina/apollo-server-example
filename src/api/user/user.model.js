const mongoose = require('mongoose');
const { Schema } = mongoose;

// (node:31357) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
// read more: https://github.com/Automattic/mongoose/issues/6890
mongoose.set('useCreateIndex', true);

const schema = {
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	isAdmin: {
		type: Boolean,
	},
};

const userSchema = new Schema(schema, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
