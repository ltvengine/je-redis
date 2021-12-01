const {JeRedis} = require('./../../dist');
const {
    keyId,
    keyIdDataAsString,
    keyDataAsHash,
    keyDataAsArray,
    keyDataAsString,
    keyIdDataAsHash,
} = require('./../stuff/method_params');
const {
    defaultJeOptions,
    jeOptionsInsertRaw,
    jeOptionsIncludeId,
    jeOptionsIdName,
    jeOptionsReturnRawInsertRaw,
    jeOptionsReturnRaw,
} = require('./../stuff/class_options');
const {hash, stringedHash, array, stringedArray, stringedHashArray, hashArray, multiData} = require('./../stuff/data');
const {
    basicHashResponse,
    hashResponseWithId,
    changedIdNameHashResponse,
} = require('./../stuff/response');
const {changedIdName} = require('./../stuff/id');
const crypto = require('crypto');

describe('Test bulk delete', () => {
    let jeRedis = null;

    beforeEach(done => {

        jeRedis = new JeRedis();
        done();

    }, 7000);

    afterEach(done => {
        if (jeRedis) {
            jeRedis.close(true).then(() => {
                jeRedis = null;
                done();
            });
        } else {
            jeRedis = null;
            done();
        }
    }, 7000);

    test('should delete all entries', (done) => {
        const randomKey = crypto.randomUUID();
        const ids = Object.keys(multiData);
        jeRedis.bulkUpsert({key: randomKey, data: multiData}, {returnArray: false})
            .then(res => {
               jeRedis.bulkDelete({key:randomKey, id: ids})
                   .then(deleted => {
                       expect(deleted).toEqual(ids.length);
                       jeRedis.findAll({key: randomKey})
                           .then(valsArray => {
                               expect(valsArray).toHaveLength(0);
                               done();
                           })
                   })
            });
    });


});