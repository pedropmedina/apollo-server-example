const Dataloader = require('dataloader');
const { keyBy } = require('lodash');

// require models to be use with Dataloader
const Group = require('./group/group.model');
const Note = require('./note/note.model');

const createGroupLoader = () => {
	return new Dataloader(async groupIds => {
		// find all groups whose id is in groupIds batch array
		const groups = await Group.find({ _id: { $in: groupIds } }).exec();
		// transform groups array into object keyed with their _id
		const groupsById = keyBy(groups, '_id');
		// iterate the groupIds batch array and return a cache array
		// with results from groups that persist the order and length
		// from groupsIds by using the stored groups by id in groupsById
		return groupIds.map(groupId => groupsById[groupId]);
	});
};

// export new instances of Dataloader in function
// in order to ensure that each user access his/her
// own instance, avoiding shared cache among users
module.exports = () => {
	return {
		group: createGroupLoader(),
	};
};
