const { google } = require('googleapis');

const books = google.books('v1');

const getBookshelves = async (root, args, ctx, info) => {
	const res = await books.mylibrary.bookshelves.list();
	return res.data.items;
};

const getBookshelf = async (root, args, ctx, info) => {
	return ctx.loaders.bookshelf.load(args.shelf);
};

const volumes = async (root, args, ctx, info) => {
	const volumes = await ctx.loaders.volumes.load(root.id);
	return !volumes ? [] : volumes;
};

module.exports = {
	Query: {
		getBookshelves,
		getBookshelf,
	},
	Bookshelf: {
		volumes,
	},
};
