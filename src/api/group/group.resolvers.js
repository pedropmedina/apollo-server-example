const {
	createOne,
	readOne,
	readMany,
	updateOne,
	deleteOne,
} = require('../CRUD');

const getUser = require('../../utils/getUser');

const getGroups = async (root, args, ctx, info) => {
	const user = await getUser(ctx);
	return readMany(ctx.models.group, (owner = user.id));
};

const getGroup = async (root, args, ctx, info) => {
	const user = await getUser(ctx);
	return readOne(ctx.models.group, args.groupId, (owner = user.id));
};

const newGroup = async (root, args, ctx, info) => {
	const user = await getUser(ctx);
	const groupInput = { ...args.input, owner: user.id };
	return createOne(ctx.models.group, groupInput);
};

const updateGroup = async (root, { input }, ctx, info) => {
	await getUser(ctx);
	return updateOne(ctx.models.group, input);
};

const deleteGroup = async (root, args, ctx, info) => {
	await getUser(ctx);
	return deleteOne(ctx.models.group, args.groupId);
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
		owner: async (root, args, ctx, info) => {
			return await ctx.models.user.findById(root.owner).exec();
		},
		notes: async (root, args, ctx, info) => {
			return ctx.models.note.find({ group: root.id }).exec();
		},
	},
};
