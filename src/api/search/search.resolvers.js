const { google } = require('googleapis');

const books = google.books('v1');

const search = async (root, { input }, ctx, info) => {
	const results = await Promise.all([
		books.mylibrary.bookshelves.get({ shelf: input.shelf }),
		books.mylibrary.bookshelves.volumes.list({
			shelf: input.shelf,
			q: input.query,
		}),
	]);

	const regex = /books#bookshelf/gi;
	const categorizedResults = results.map(
		result => (regex.test(result.data.kind) ? result.data : result.data.items),
	);
	return [].concat(...categorizedResults);
};

module.exports = {
	Query: {
		search,
	},
	// search query is going to resolve in an array of either
	// Bookshelves or Volumes, both under union SearchResult.
	// SearchResult must be resolved to either of the two
	// expected results from search
	SearchResults: {
		__resolveType(searchResult) {
			// console.log(searchResult);
			if (searchResult.volumeInfo) {
				return 'Volume';
			} else {
				return 'Bookshelf';
			}
		},
	},
};
