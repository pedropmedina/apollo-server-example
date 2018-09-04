const signin = async (root, args, ctx, info) => {
	console.log('successful sigin');
};

module.exports = {
	Query: {
		signin,
	},
};
