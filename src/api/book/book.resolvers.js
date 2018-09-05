const { google } = require('googleapis');

const books = google.books('v1');

const getBooks = async (root, args, ctx, info) => {
	const res = await books.mylibrary.bookshelves.list();
	console.log(res.data.items);
};

module.exports = {
	Query: {
		getBooks,
	},
};

// bookshelf.list - no parameters required
// bookshelf.get - requires 'shelf' : shelf number
// bookshelf.volumes.list - requires 'shelf : shelf number
// books.volumes.get({ volumeId: id })
