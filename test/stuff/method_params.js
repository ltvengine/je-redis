const {hash, array, hashArray, _string, num} = require('./data');
const {basicKey} = require('./key');
const {basicId} = require('./id');

const keyId = {
    key: basicKey,
    id: basicId,
};
const keyIdDataAsString = {
    ...keyId,
    data: _string,
};
const keyDataAsString = {
    key: basicKey,
    data: _string,
};
const keyDataAsHash = {
    key: basicKey,
    data: hash,
};
const keyIdDataAsHash = {
    ...keyId,
    data: hash,
};

const keyIdDataAsArray = {
    ...keyId,
    data: array,
};
const keyDataAsArray = {
    key: basicKey,
    data: array,
};
const keyDataAsHashArray = {
    ...keyId,
    data: hashArray,
};


module.exports = {
    keyDataAsHash, keyId, keyIdDataAsString, keyIdDataAsHash, keyDataAsArray,
    keyDataAsHashArray,keyDataAsString, keyIdDataAsArray
};