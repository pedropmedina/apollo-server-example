const { google } = require('googleapis');

const books = google.books('v1');

const getVolumes = async (root, args, ctx, info) => {
	const volumes = await ctx.loaders.volumes.load(args.shelf);
	return !volumes ? [] : volumes;
};

const getVolume = async (root, args, ctx, info) => {
	return ctx.loaders.volume.load(args.id);
};

const addVolume = async (root, { input }, ctx, info) => {
	const res = await books.mylibrary.bookshelves.addVolume({
		shelf: input.shelf,
		volumeId: input.volumeId,
	});
	return `volume with id ${input.volumeId} was added.`;
};

const removeVolume = async (root, { input }, ctx, info) => {
	const res = await books.mylibrary.bookshelves.removeVolume({
		shelf: input.shelf,
		volumeId: input.volumeId,
	});
	return `volume with id ${input.volumeId} was removed.`;
};

const searchVolume = async (root, args, ctx, info) => {
	const res = await books.volumes.list({
		q: args.query,
		orderBy: 'relevance',
	});
	return res.data.items;
};

const recommendedVolumes = async (root, args, ctx, info) => {
	const res = await books.volumes.recommended.list();
	return res.data.items;
};

module.exports = {
	Query: {
		getVolumes,
		getVolume,
		searchVolume,
		recommendedVolumes,
	},
	Mutation: {
		addVolume,
		removeVolume,
	},
};
