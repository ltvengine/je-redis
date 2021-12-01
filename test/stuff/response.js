const {hash, array, hashArray, _string, num} = require('./data');
const {basicId, changedIdName} = require('./id');

const basicHashResponse = {
    ...hash,
};
const stringedBasicHashResponse = JSON.stringify(basicHashResponse);
const hashResponseWithId = {
    ...hash,
    id: basicId,
};

const changedIdNameHashResponse = {
    ...hash,
    [changedIdName]: basicId,
};
module.exports = {
    basicHashResponse,
    hashResponseWithId,
    changedIdNameHashResponse,
    stringedBasicHashResponse
};