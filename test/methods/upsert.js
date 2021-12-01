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
const {hash, stringedHash, array, stringedArray, stringedHashArray, hashArray} = require('./../stuff/data');
const {
    basicHashResponse,
    hashResponseWithId,
    changedIdNameHashResponse,
} = require('./../stuff/response');
const {changedIdName} = require('./../stuff/id');

describe('Test upsert', () => {
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

    test('should upsert existing', (done) => {
        jeRedis.insert(keyDataAsHash, jeOptionsIncludeId)
            .then(res => {
                const dataToUpsert = {test: 1};
                jeRedis.upsert({key: keyDataAsHash.key, id: res.id, data: dataToUpsert}, {overwrite: true})
                    .then(upserted => {
                        expect(upserted).toEqual(dataToUpsert);
                        jeRedis.findOne({key: keyDataAsHash.key, id: res.id})
                            .then(find => {
                                expect(find).toEqual(dataToUpsert);
                                done();
                            });
                    });
            });
    });

    test('should mix with existing.', (done) => {
        jeRedis.insert(keyDataAsHash, jeOptionsIncludeId)
            .then(inserted => {
                const dataToUpsert = {test: 1};
                jeRedis.upsert({key: keyDataAsHash.key, id: inserted.id, data: dataToUpsert})
                    .then(() => {
                        jeRedis.findOne({key: keyDataAsHash.key, id: inserted.id})
                            .then(find => {
                                expect(find).toEqual({
                                    ...keyDataAsHash.data,
                                    ...dataToUpsert
                                });
                                done();
                            });
                    });
            });
    });

});