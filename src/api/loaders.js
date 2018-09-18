const Dataloader = require('dataloader');
const { keyBy, groupBy } = require('lodash');

// getUser utility function
const getUser = require('../utils/getUser');

// require models to be use with Dataloader
const Group = require('./group/group.model');
const Note = require('./note/note.model');
const User = require('./user/user.model');

const createGroupLoader = req => {
	return new Dataloader(async groupIds => {
		// get verified user to find groups where owner is user.id
		const user = await getUser({ req, User });
		// find all groups whose id is in groupIds batch array
		const groups = await Group.find({
			_id: { $in: groupIds },
			owner: user.id,
		}).exec();
		// transform groups array into object keyed with their _id
		const groupsById = keyBy(groups, '_id');
		// iterate the groupIds batch array and return a cache array
		// with results from groups that persist the order and length
		// from groupsIds by using the stored groups by id in groupsById
		return groupIds.map(groupId => groupsById[groupId]);
	});
};

const createNotesByGroup = () => {
	return new Dataloader(async groupIds => {
		const notes = await Note.find({ group: { $in: groupIds } }).exec();
		const notesByGroup = groupBy(notes, 'group');
		return groupIds.map(groupId => notesByGroup[groupId]);
	});
};

const createOwnerLoader = () => {
	return new Dataloader(async ownerIds => {
		const users = await User.find({ _id: { $in: ownerIds } }).exec();
		const userById = keyBy(users, '_id');
		return ownerIds.map(ownerId => userById[ownerId]);
	});
};

// export new instances of Dataloader in function
// in order to ensure that each user access his/her
// own instance, avoiding shared cache among users
module.exports = req => {
	return {
		group: createGroupLoader(req),
		owner: createOwnerLoader(),
		notesByGroup: createNotesByGroup(),
	};
};
