const Group = require('./group.model');

const getGroups = async (root, args, ctx, info) => {
	const groups = await Group.find().exec();
	return groups;
};

module.exports = {
	Query: {
		getGroups,
	},
};
