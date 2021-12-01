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

describe('Test bulk upsert', () => {
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

    test('should insert hash of ids-values and return it', (done) => {
        const randomKey = crypto.randomUUID();
        jeRedis.bulkUpsert({key: randomKey, data: multiData}, {returnArray: false})
            .then(res => {
                Object.entries(res).map(([key, val]) => {
                    expect(multiData[key]).toEqual(val);
                });
                done();
            });
    });


    test('should insert hash of ids-values and return it as array', (done) => {
        const randomKey = crypto.randomUUID();
        jeRedis.bulkUpsert({key: randomKey, data: multiData}, {returnArray: true})
            .then(res => {
                expect(res).toEqual(Object.values(multiData));
                done();
            });
    });

    test('should insert array of values and return it as array', (done) => {
        const randomKey = crypto.randomUUID();
        const arrMultiData = Object.values(multiData);
        jeRedis.bulkUpsert({key: randomKey, data: arrMultiData}, {returnArray: true})
            .then(res => {
                expect(res).toEqual(arrMultiData);
                done();
            });
    });

});