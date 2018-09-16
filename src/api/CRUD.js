const createOne = async (model, input) => {
	try {
		return await model.create(input);
	} catch (error) {
		console.error(error.message);
	}
};

const readOne = async (model, id, owner) => {
	try {
		return await model.findOne({ _id: id, owner }).exec();
	} catch (error) {
		console.error(error.message);
	}
};

const readMany = async (model, owner) => {
	try {
		return await model.find({ owner }).exec();
	} catch (error) {
		console.error(error.message);
	}
};

const updateOne = async (model, input) => {
	try {
		const { id, ...update } = input;
		return await model.findByIdAndUpdate(id, { $set: update }, { new: true });
	} catch (error) {
		console.error(error.message);
	}
};

const deleteOne = async (model, id) => {
	try {
		return await model.findByIdAndRemove(id).exec();
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
