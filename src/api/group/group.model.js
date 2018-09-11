const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = {
	name: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		minLength: 1,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
};

const groupSchema = new Schema(schema, { timestamps: true });

groupSchema.index({ name: 'text', description: 'text' });

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
