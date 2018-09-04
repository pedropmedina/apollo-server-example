const fetch = require('node-fetch');

const API_KEY = 'AIzaSyB1YhQmD5nmA_-_456LFXu_DZRLeR2dQPo';
const url = `https://www.googleapis.com/books/v1/mylibrary/bookshelves/0/volumes?key=${API_KEY}`;
const access_token =
	'ya29.GlwNBg5-6V7iabilKofJTUxMYabotURFJ76QKnjnSQkXACb_YyyAuQ92-5UhUrCfc8QYB7fn2tCKg3wpMSWCaHoD60gpS5jNnzsnmx70O6kHXxL62lMdUpQL2N5veQ';

const signin = (root, args, ctx, info) => {
	fetch(url, {
		method: 'GET',
		headers: { Authorization: `Bearer ${access_token}` },
	})
		.then(res => res.json())
		.then(json => console.log(json));
};

module.exports = {
	Query: {
		signin,
	},
};
