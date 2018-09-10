const {
	createOne,
	readOne,
	readMany,
	updateOne,
	deleteOne,
} = require('../CRUD');

const getNote = async (root, args, ctx, info) => {
	return readOne(ctx.models.note, args.noteId);
};

const getNotes = async (root, args, ctx, info) => {
	return readMany(ctx.models.note);
};

const newNote = async (root, { input }, ctx, info) => {
	return createOne(ctx.models.note, input);
};

const updateNote = async (root, { input }, ctx, info) => {
	return updateOne(ctx.models.note, input);
};

const deleteNote = async (root, args, ctx, info) => {
	return deleteOne(ctx.models.note, args.noteId);
};

module.exports = {
	Query: {
		getNote,
		getNotes,
	},
	Mutation: {
		newNote,
		updateNote,
		deleteNote,
	},
};
