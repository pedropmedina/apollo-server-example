const createOne = async (model, input) => {
	return await model.create(input).exec();
};

module.exports = {
	createOne,
};
