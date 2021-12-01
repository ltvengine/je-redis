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

describe('Test count ids', () => {
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

    test('should return ids num', (done) => {
        const randomKey = crypto.randomUUID();
        jeRedis.bulkUpsert({key: randomKey, data: multiData})
            .then(res => {
                jeRedis.countIds({key: randomKey})
                    .then(idsNum => {
                        expect(idsNum).toEqual(Object.keys(multiData).length);

                        done();
                    });
            });
    });

    test('should return 0 if no ids', (done) => {
        const randomKey = crypto.randomUUID();

        jeRedis.countIds({key: randomKey})
            .then(idsNum => {
                expect(idsNum).toEqual(0);
                done();
            });

    });


});