const mongoose = require('mongoose');

// Avoid DeprecationWarning: collection.findAndModify
// READ MORE: https://github.com/Automattic/mongoose/issues/6880
mongoose.set('useFindAndModify', false);

module.exports = async url => {
	try {
		await mongoose.connect(
			url || process.env.MONGODB_URI,
			{ useNewUrlParser: true },
		);
		console.log('🔌  Successful db connection.');
	} catch (error) {
		console.log(error);
	}
};
