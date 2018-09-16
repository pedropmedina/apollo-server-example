const createOne = async (model, input) => {
	try {
		return await model.create(input);
	} catch (error) {
		console.error(error.message);
	}
};

const readOne = async (model, id, owner = '') => {
	try {
		return await model.findOne({ _id: id, owner }).exec();
	} catch (error) {
		console.error(error.message);
	}
};

const readMany = async (model, owner = '') => {
	try {
		return await model.find({ owner }).exec();
	} catch (error) {
		console.error(error.message);
	}
};

const updateOne = async (model, input, owner = '') => {
	try {
		const { id, ...update } = input;
		return await model.findOneAndUpdate(
			{ _id: id, owner },
			{ $set: update },
			{ new: true },
		);
	} catch (error) {
		console.error(error.message);
	}
};

const deleteOne = async (model, id, owner = '') => {
	try {
		return await model.findOneAndDelete({ _id: id, owner }).exec();
	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	createOne,
	readOne,
	readMany,
	updateOne,
	deleteOne,
};
