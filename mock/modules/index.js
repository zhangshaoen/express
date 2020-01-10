const testPost = require('./server/testPost');
const testGet = require('./server/testGet');
const getResourceAmount = require('./server/getResourceAmount');

module.exports = [
	testPost,
	testGet,
	getResourceAmount
]