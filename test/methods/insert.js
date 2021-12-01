const {JeRedis} = require('./../../dist');
const {keyId, keyIdDataAsString,keyDataAsHash,keyDataAsArray, keyDataAsString, keyIdDataAsHash} = require('./../stuff/method_params');
const {defaultJeOptions, jeOptionsInsertRaw, jeOptionsIncludeId, jeOptionsIdName,jeOptionsReturnRawInsertRaw, jeOptionsReturnRaw} = require('./../stuff/class_options');
const {hash, stringedHash, array, stringedArray, stringedHashArray, hashArray} = require('./../stuff/data');
const {basicHashResponse,
    hashResponseWithId,
    changedIdNameHashResponse} = require('./../stuff/response');
const {changedIdName}= require('./../stuff/id');
const crypto = require('crypto');

describe('Test insert', () => {
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

    test('should insert hash and return it', (done) => {
         jeRedis.insert(keyDataAsHash)
            .then(res => {
                 expect(res).toEqual(hash);
                 done();
            })
    });

    test('should insert hash and find it', (done) => {
        jeRedis.insert(keyDataAsHash, jeOptionsIncludeId)
            .then(res => {
                jeRedis.findOne({key: keyDataAsHash.key, id: res.id})
                    .then(find => {
                        expect(find).toEqual(hash);
                        done();
                    })

            })
    });

    test('should insert hash and return it with id', (done) => {
         jeRedis.insert(keyDataAsHash, jeOptionsIncludeId)
            .then(res => {
                expect(res).toHaveProperty('name');
                expect(res).toHaveProperty('surname');
                expect(res).toHaveProperty('id');

                expect(res.name).toEqual(hash.name);
                expect(res.surname).toEqual(hash.surname);


                done();
            });
    });


    test('should insert hash and return it with id with custom name', (done) => {
        jeRedis.insert(keyDataAsHash, jeOptionsIdName)
            .then(res => {
                expect(res).toHaveProperty('name');
                expect(res).toHaveProperty('surname');
                expect(res).toHaveProperty(changedIdName);

                expect(res.name).toEqual(hash.name);
                expect(res.surname).toEqual(hash.surname);


                done();
            });
    });

    test('should insert raw and return it raw.', (done) => {
        jeRedis.insert(keyDataAsString, jeOptionsReturnRawInsertRaw)
            .then(res => {
                expect(typeof res).toEqual('string');
                expect(res).toEqual(keyDataAsString.data);

                done();
            });
    });

    test('should insert array and return it.', (done) => {
        jeRedis.insert(keyDataAsArray, defaultJeOptions)
            .then(res => {
                expect(Array.isArray(res)).toEqual(true);
                expect(res).toEqual(keyDataAsArray.data);

                done();
            });
    });

    test('should insert array and return it raw.', (done) => {
        jeRedis.insert(keyDataAsArray, jeOptionsReturnRaw)
            .then(res => {
                expect(typeof res).toEqual('string');
                expect(res).toEqual(JSON.stringify(keyDataAsArray.data));

                done();
            });
    });



});