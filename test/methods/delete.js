const {JeRedis} = require('./../../dist');
const crypto = require('crypto');

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
const {hash, stringedHash, array, stringedArray, stringedHashArray, hashArray} = require('./../stuff/data');
const {
    basicHashResponse,
    hashResponseWithId,
    changedIdNameHashResponse,
} = require('./../stuff/response');
const {changedIdName} = require('./../stuff/id');

describe('Test delete', () => {
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

    test('should delete entry', (done) => {
        jeRedis.insert(keyDataAsHash, jeOptionsIncludeId)
            .then(res => {
                jeRedis.delete({key: keyDataAsHash.key, id: res.id})
                    .then(deleted => {
                        expect(deleted).toEqual(1);
                        jeRedis.findOne({key: keyDataAsHash.key, id: res.id})
                            .then(find => {
                                expect(find).toBeNull();
                                done();
                            });
                    });
            });
    });

    test('should delete entry and return deleted id', (done) => {
        jeRedis.insert(keyDataAsHash, jeOptionsIncludeId)
            .then(res => {
                jeRedis.delete({key: keyDataAsHash.key, id: res.id}, {returnId: true})
                    .then(deleted => {
                        expect(deleted).toEqual(res.id);
                        done();
                    });
            });
    });

    test('should not delete entry if it doesn`t exist', (done) => {
        const fakeId = crypto.randomUUID();


        jeRedis.delete({key: keyDataAsHash.key, id: fakeId}, {returnId: false})
            .then(deleted => {
                expect(deleted).toEqual(0);
                done();
            });

    });

    test('should not delete entry if it doesn`t exist & return null', (done) => {
        const fakeId = crypto.randomUUID();


        jeRedis.delete({key: keyDataAsHash.key, id: fakeId}, {returnId: true})
            .then(deleted => {
                expect(deleted).toBeNull();
                done();
            });

    });


});