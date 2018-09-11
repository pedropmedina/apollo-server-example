const { google } = require('googleapis');

const books = google.books('v1');

const search = async (root, { input }, ctx, info) => {
	const apiSearchResults = await Promise.all([
		books.mylibrary.bookshelves.get({ shelf: input.shelf }),
		books.mylibrary.bookshelves.volumes.list({
			shelf: input.shelf,
			q: input.query,
		}),
	]);

	const query = { $text: { $search: input.query } };
	const mongodbSearchResults = await Promise.all([
		ctx.models.group.find(query).exec(),
		ctx.models.note.find(query).exec(),
	]);

	// return data object when bookshelf, and data.items when volume
	const regex = /books#bookshelf/gi;
	const apiResultsByKind = apiSearchResults.map(
		result => (regex.test(result.data.kind) ? result.data : result.data.items),
	);

	return [].concat(...apiResultsByKind, ...mongodbSearchResults);
};

module.exports = {
	Query: {
		search,
	},
	SearchResults: {
		__resolveType(searchResult) {
			if (searchResult.volumeInfo) {
				return 'Volume';
			} else if (searchResult.volumeCount) {
				return 'Bookshelf';
			} else if (searchResult.owner) {
				return 'Group';
			} else if (searchResult.group) {
				return 'Note';
			}
		},
	},
};
