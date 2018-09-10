const Group = require('./group.model');

const getGroups = async (root, args, ctx, info) => {
	const groups = await Group.find().exec();
	return groups;
};

const getGroup = async (root, args, ctx, info) => {
	const group = await Group.findById(args.groupId).exec();
	return group;
};

const newGroup = async (roor, args, ctx, info) => {
	const group = await Group.create(args.input);
	return group;
};

module.exports = {
	Query: {
		getGroups,
		getGroup,
	},
	Mutation: {
		newGroup,
	},
	Group: {
		owner: async (root, args, ctx, info) => {
			const owner = await ctx.models.user.findById(root.owner).exec();
			return owner;
		},
	},
};
