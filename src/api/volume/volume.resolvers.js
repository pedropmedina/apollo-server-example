const { google } = require('googleapis');

const books = google.books('v1');

const getVolumes = async (root, args, ctx, info) => {
	const res = await books.mylibrary.bookshelves.volumes.list({
		shelf: args.shelfId,
	});
	console.log(res.data);
};

module.exports = {
	Query: {
		getVolumes,
	},
};
