const { oAuth2Client } = require('../../oAuth2Client');
const tokens = require('../../../tokens.json');

const url =
	'https://www.googleapis.com/books/v1/mylibrary/bookshelves/0/volumes';

const getBooks = async (root, args, ctx, info) => {
	oAuth2Client.setCredentials(tokens);
	const res = await oAuth2Client.request({ url });
	console.log(res.data.totalItems);
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
