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

describe('Test find all', () => {
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

    test('should return hash of multiple keys', (done) => {
        const randomKey = crypto.randomUUID();
        jeRedis.bulkUpsert({key: randomKey, data: multiData})
            .then(res => {
                jeRedis.findAll({key: randomKey}, {returnArray: false})
                    .then(idValsHash => {
                        Object.entries(idValsHash).map(([key, val]) => {
                            expect(multiData[key]).toEqual(val);
                        });
                        done();
                    });
            });
    });

    test('should return array of multiple keys', (done) => {
        const randomKey = crypto.randomUUID();
        jeRedis.bulkUpsert({key: randomKey, data: multiData})
            .then(res => {
                jeRedis.findAll({key: randomKey})
                    .then(idValsArray => {
                        expect(idValsArray.length).toEqual(Object.keys(multiData).length);
                        done();
                    });
            });
    });

    test('should return null if no keys', (done) => {
        const randomKey = crypto.randomUUID();

        jeRedis.findAll({key: randomKey}, {returnArray: false})
            .then(idValsHash => {
                expect(idValsHash).toBeNull();
                done();
            });

    });

    test('should return empty array if no keys', (done) => {
        const randomKey = crypto.randomUUID();

        jeRedis.findAll({key: randomKey})
            .then(idValsArray => {
                expect(idValsArray).toBeInstanceOf(Array);
                expect(idValsArray).toHaveLength(0);
                done();
            });

    });

});