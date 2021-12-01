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

describe('Test update', () => {
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

    test('should update & overwrite existing', (done) => {
        jeRedis.insert(keyDataAsHash, jeOptionsIncludeId)
            .then(res => {
                const dataToUpdate = {test: 1};
                jeRedis.update({key: keyDataAsHash.key, id: res.id, data: dataToUpdate}, {overwrite: true})
                    .then(updated => {
                        expect(updated).toEqual(dataToUpdate);
                        jeRedis.findOne({key: keyDataAsHash.key, id: res.id})
                            .then(find => {
                                expect(find).toEqual(dataToUpdate);
                                done();
                            });
                    });
            });
    });

    test('should mix with existing.', (done) => {
        jeRedis.insert(keyDataAsHash, jeOptionsIncludeId)
            .then(inserted => {
                const dataToUpdate = {test: 1};
                jeRedis.update({key: keyDataAsHash.key, id: inserted.id, data: dataToUpdate})
                    .then(() => {
                        jeRedis.findOne({key: keyDataAsHash.key, id: inserted.id})
                            .then(find => {
                                expect(find).toEqual({
                                    ...keyDataAsHash.data,
                                    ...dataToUpdate,
                                });
                                done();
                            });
                    });
            });
    });

    test('should return null if no such id.', (done) => {
        const fakeId = crypto.randomUUID();

        const dataToUpdate = {test: 1};
        jeRedis.update({key: keyDataAsHash.key, id: fakeId, data: dataToUpdate})
            .then(updated => {
                expect(updated).toBeNull();
                jeRedis.findOne({key: keyDataAsHash.key, id: fakeId})
                    .then(find => {
                        expect(find).toBeNull();

                        done();
                    });
            });
    });

});