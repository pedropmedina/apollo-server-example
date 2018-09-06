const mongoose = require('mongoose');

module.exports = async url => {
	try {
		await mongoose.connect(
			url,
			{ useNewUrlParser: true },
		);
		console.log('🔌  Successful db connection.');
	} catch (error) {
		console.log(error);
	}
};
