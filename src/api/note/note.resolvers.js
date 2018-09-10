const Note = require('./note.model');

const getNote = async (root, args, ctx, info) => {
	const note = await Note.findById(args.noteId).exec();
	return note;
};

const newNote = async (root, args, ctx, info) => {
	const note = await Note.create(args.input).exec();
	return note;
};

module.exports = {
	Query: {
		getNote,
	},
	Mutation: {
		newNote,
	},
};
