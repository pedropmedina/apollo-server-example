const { google } = require('googleapis');

const books = google.books('v1');

const getBookshelves = async (root, args, ctx, info) => {
	const res = await books.mylibrary.bookshelves.list();
	return res.data.items;
	console.log(res.data.items);
};

const getBookshelf = async (root, args, ctx, info) => {
	const res = await books.mylibrary.bookshelves.get({ shelf: args.shelfId });
	return res.data;
	console.log(res.data);
};

module.exports = {
	Query: {
		getBookshelves,
		getBookshelf,
	},
};

// bookshelf.list - no parameters required
// bookshelf.get - requires 'shelf' : shelf number
// bookshelf.volumes.list - requires 'shelf : shelf number
// books.volumes.get({ volumeId: id })
