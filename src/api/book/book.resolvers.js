const { google } = require('googleapis');

const tokens = require('../../../tokens.json');
const keys = require('../../../keys.json');

// instantiate OAuth2
const oAuth2Client = new google.auth.OAuth2(
	keys.web.client_id,
	keys.web.client_secret,
	keys.web.redirect_uris[0],
);

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
	Query: {
		getBooks,
	},
};

// bookshelf.list - no parameters required
// bookshelf.get - requires 'shelf' : shelf number
// bookshelf.volumes.list - requires 'shelf : shelf number
