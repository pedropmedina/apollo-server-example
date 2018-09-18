const getUserId = require('../../utils/getUserId');

const getNote = async (root, { input }, ctx, info) => {
	try {
		await getUserId({ req: ctx.req, User: ctx.models.user });
		return await ctx.models.note
			.findOne({ _id: input.id, group: input.group })
			.exec();
	} catch (error) {
		console.error(error.message);
	}
};

const getNotes = async (root, args, ctx, info) => {
	try {
		await getUserId({ req: ctx.req, User: ctx.models.user });
		return await ctx.models.note.find({ group: args.group }).exec();
	} catch (error) {
		console.error(error.message);
	}
};

const newNote = async (root, { input }, ctx, info) => {
	try {
		getUserId({ req: ctx.req, User: ctx.models.user });
		return await ctx.models.note.create(input);
	} catch (error) {
		console.error(error.message);
	}
};

const updateNote = async (root, { input }, ctx, info) => {
	try {
		await getUserId({ req: ctx.req, User: ctx.models.user });
		const { id, group, ...update } = input;
		return await ctx.models.note
			.findOneAndUpdate({ _id: id, group }, { $set: update }, { new: true })
			.exec();
	} catch (error) {
		console.error(error.message);
	}
};

const deleteNote = async (root, { input }, ctx, info) => {
	try {
		await getUserId({ req: ctx.req, User: ctx.models.user });
		return await ctx.models.note
			.findOneAndDelete({ _id: input.id, group: input.group })
			.exec();
	} catch (error) {
		console.error(error.message);
	}
};

const group = async (root, args, ctx, info) => {
	try {
		return ctx.models.group.findById(root.group).exec();
	} catch (error) {
		console.error(error.message);
	}
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
	Note: {
		group,
	},
};
