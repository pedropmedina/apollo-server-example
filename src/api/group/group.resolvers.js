const getUser = require('../../utils/getUser');

const getGroups = async (root, args, ctx, info) => {
	try {
		const user = await getUser({ req: ctx.req, User: ctx.models.user });
		return await ctx.models.group.find({ owner: user.id }).exec();
	} catch (error) {
		console.error(error.message);
	}
};

const getGroup = async (root, args, ctx, info) => {
	try {
		return await ctx.loaders.group.load(args.id);
	} catch (error) {
		console.error(error.message);
	}
};

const newGroup = async (root, { input }, ctx, info) => {
	try {
		const user = await getUser({ req: ctx.req, User: ctx.models.user });
		return await ctx.models.group.create({ ...input, owner: user.id });
	} catch (error) {
		console.error(error.message);
	}
};

const updateGroup = async (root, { input }, ctx, info) => {
	try {
		const user = await getUser({ req: ctx.req, User: ctx.models.user });
		const { id, ...update } = input;
		return await ctx.models.group
			.findOneAndUpdate(
				{ _id: id, owner: user.id },
				{ $set: update },
				{ new: true },
			)
			.exec();
	} catch (error) {
		console.error(error.message);
	}
};

const deleteGroup = async (root, args, ctx, info) => {
	try {
		const user = await getUser({ req: ctx.req, User: ctx.models.user });
		return await ctx.models.group
			.findOneAndDelete({
				_id: args.id,
				owner: user.id,
			})
			.exec();
	} catch (error) {
		console.error(error.message);
	}
};

const owner = async (root, args, ctx, info) => {
	return ctx.loaders.owner.load(root.owner);
};

const notes = async (root, args, ctx, info) => {
	const notesInGroup = await ctx.loaders.notesByGroup.load(root.id);
	return notesInGroup === undefined ? [] : notesInGroup;
};

module.exports = {
	Query: {
		getGroups,
		getGroup,
	},
	Mutation: {
		newGroup,
		updateGroup,
		deleteGroup,
	},
	Group: {
		owner,
		notes,
	},
};
