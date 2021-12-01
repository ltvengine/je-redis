const {JeRedis} = require('./../../dist');
const crypto = require('crypto');
const {
    keyId, keyDataAsHash, keyIdDataAsString, keyIdDataAsHash, keyDataAsArray,
    keyDataAsHashArray,
} = require('./../stuff/method_params');
const {
    defaultJeOptions,
    jeOptionsInsertRaw,
    jeOptionsIncludeId,
    jeOptionsIdName,
    jeOptionsReturnRaw,
} = require('./../stuff/class_options');
const {hash, stringedHash, array, stringedArray, stringedHashArray, hashArray} = require('./../stuff/data');
const {
    basicHashResponse,
    hashResponseWithId,
    changedIdNameHashResponse,
} = require('./../stuff/response');
const {changedIdName} = require('./../stuff/id');


describe('Test findOne', () => {
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

    test('Find hash', done => {


        jeRedis.insert(keyDataAsHash, jeOptionsIncludeId)
            .then(inserted => {

                jeRedis.findOne({key: keyIdDataAsHash.key, id: inserted.id})
                    .then(find => {

                        expect(find).toEqual(hash);
                        done();
                    });
            });

    });

    test('Find hash and return w id', done => {


        jeRedis.insert(keyDataAsHash, jeOptionsIncludeId)
            .then(inserted => {

                jeRedis.findOne({key: keyIdDataAsHash.key, id: inserted.id}, jeOptionsIncludeId)
                    .then(find => {

                        expect(find).toEqual({
                            ...hash,
                            id: inserted.id,
                        });
                        done();
                    });
            });

    });

    test('Find hash and return w custom name', done => {


        jeRedis.insert(keyDataAsHash, jeOptionsIncludeId)
            .then(inserted => {

                jeRedis.findOne({key: keyDataAsHash.key, id: inserted.id}, jeOptionsIdName)
                    .then(find => {

                        expect(find).toEqual({
                            ...hash,
                            [changedIdName]: inserted.id,
                        });
                        done();
                    });
            });

    });

    test('Find one as array', done => {

        jeRedis.insert(keyDataAsArray, jeOptionsIncludeId)
            .then(inserted => {
                 jeRedis.findOne({key: keyDataAsArray.key, id: Object.keys(inserted)[0]}, defaultJeOptions)
                    .then(find => {
                         expect(find).toEqual(keyDataAsArray.data);
                        done();
                    });
            });

    });

    test('Find one as array return as hash w id', done => {

        jeRedis.insert(keyDataAsArray, jeOptionsIncludeId)
            .then(inserted => {
                jeRedis.findOne({key: keyDataAsArray.key, id: Object.keys(inserted)[0]}, jeOptionsIncludeId)
                    .then(find => {
                         expect(find).toEqual({
                             [Object.keys(inserted)[0]]: keyDataAsArray.data
                         });
                        done();
                    });
            });

    });

    test('No find returns null', done => {

        const fakeId = crypto.randomUUID();
        jeRedis.findOne({key: keyDataAsArray.key, id: fakeId}, defaultJeOptions)
            .then(find => {
                expect(find).toBeNull();
                done();

            });


    });

});