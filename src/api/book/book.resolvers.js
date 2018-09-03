const { google } = require('googleapis');

const { oAuth2Client } = require('../user/user.resolvers');
const tokens = require('../../../tokens.json');

// access api and provide authentication
const books = google.books({
	version: 'v1',
	auth: oAuth2Client.setCredentials(tokens),
});

// get all books
const getBooks = async (root, args, ctx, info) => {
	try {
		const res = await books.volumes.get({
			volumeId: 'Yd99BAAAQBAJ',
		});
		console.log(res.data);
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	resolvers: {
		Query: {
			getBooks,
		},
	},
};

// bookshelf.list - no parameters required
// bookshelf.get - requires 'shelf' : shelf number
// bookshelf.volumes.list - requires 'shelf : shelf number
