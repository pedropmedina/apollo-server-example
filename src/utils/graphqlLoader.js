const path = require('path');
const fs = require('fs');

// Return file as string allowing for modularization of typeDefs
// into independent .graphql files. Then, we add all typeDefs into
// one array and join into one large array. I FIND THIS WAY CLEANER.

// Another way of achiving the same is using makeExecutableSchema
// from graphql-tools -> https://www.apollographql.com/docs/graphql-tools/generate-schema.html#modularizing

module.exports = fileName => {
	const filePath = path.join(__dirname, '../api', fileName);
	return fs.readFileSync(filePath, 'utf8');
};
