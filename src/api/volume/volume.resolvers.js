const { google } = require('googleapis');

const books = google.books('v1');

const getVolumes = async (root, args, ctx, info) => {
	const res = await books.mylibrary.bookshelves.volumes.list({
		shelf: args.shelfId,
	});
	console.log(res.data.items);
	return res.data.items;
};

module.exports = {
	Query: {
		getVolumes,
	},
};
