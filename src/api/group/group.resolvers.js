const {
	createOne,
	readOne,
	readMany,
	updateOne,
	deleteOne,
} = require('../CRUD');

const getGroups = async (root, args, ctx, info) => {
	return readMany(ctx.models.group);
};

const getGroup = async (root, args, ctx, info) => {
	return readOne(ctx.models.group, args.groupId);
};

const newGroup = async (root, args, ctx, info) => {
	return createOne(ctx.models.group, args.input);
};

const updateGroup = async (root, { input }, ctx, info) => {
	return updateOne(ctx.models.group, input);
};

const removeGroup = async (root, args, ctx, info) => {
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
		removeGroup,
	},
	Group: {
		owner: async (root, args, ctx, info) => {
			const owner = await ctx.models.user.findById(root.owner).exec();
			return owner;
		},
	},
};
