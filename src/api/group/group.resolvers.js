const Group = require('./group.model');
const { createOne } = require('../CRUD');

const getGroups = async (root, args, ctx, info) => {
	const groups = await Group.find().exec();
	return groups;
};

const getGroup = async (root, args, ctx, info) => {
	return createOne(ctx.models.group, args.input);
};

const newGroup = async (root, args, ctx, info) => {
	const group = await Group.create(args.input);
	return group;
};

const updateGroup = async (root, { input }, ctx, info) => {
	const { id, ...rest } = input;
	const update = Group.findByIdAndUpdate(id, { $set: rest }, { new: true });
	console.log(update);
	return update;
};

const removeGroup = async (root, args, ctx, info) => {
	const group = await Group.findByIdAndRemove(args.groupId).exec();
	console.log(group);
	return group;
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
