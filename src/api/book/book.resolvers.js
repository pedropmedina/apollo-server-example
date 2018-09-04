// get all books
const getBooks = async (root, args, ctx, info) => {
	try {
		// nothing here yet
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
// books.volumes.get({ volumeId: id })
