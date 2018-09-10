const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = {
	content: {
		type: String,
		minlenght: 1,
		required: true,
	},
	group: {
		type: Schema.Types.ObjectId,
		ref: 'Group',
	},
};

const noteSchema = new Schema(schema, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
