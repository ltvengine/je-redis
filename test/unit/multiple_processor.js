const {singleProcessor} = require('./../../dist/processors/single');
const {keyId, keyIdDataAsString, keyIdDataAsHash} = require('./../stuff/method_params');
const {defaultJeOptions, jeOptionsInsertRaw, jeOptionsIncludeId, jeOptionsIdName, jeOptionsReturnRaw} = require('./../stuff/class_options');
const {hash, stringedHash, array, stringedArray, stringedHashArray, hashArray} = require('./../stuff/data');
const {basicHashResponse,
    hashResponseWithId,
    changedIdNameHashResponse} = require('./../stuff/response');

const {basicId, changedIdName} = require('./../stuff/id');

describe('Test single processor', () => {

    test('Return hash if stringed hash found and no returnId', done => {
        singleProcessor(stringedHash, keyId, defaultJeOptions)
            .then(processedResponse => {
                expect(processedResponse).toEqual(basicHashResponse);
                done();
            });

    });

    test('Return array if stringed array found and no returnRaw', done => {
        singleProcessor(stringedArray, keyId, defaultJeOptions)
            .then(processedResponse => {
                expect(processedResponse).toEqual(array);
                done();
            });

    });

    test('Return stringed array if stringed array found and returnRaw set', done => {
        singleProcessor(stringedArray, keyId, jeOptionsReturnRaw)
            .then(processedResponse => {
                expect(processedResponse).toEqual(stringedArray);
                done();
            });

    });

    test('Return hash array if stringed hash array found and no returnRaw.', done => {
        singleProcessor(stringedHashArray, keyId, defaultJeOptions)
            .then(processedResponse => {
                expect(processedResponse).toEqual(hashArray);
                done();
            });

    });

    test('Return stringed hash array if stringed hash array found and   returnRaw set.', done => {
        singleProcessor(stringedHashArray, keyId, jeOptionsReturnRaw)
            .then(processedResponse => {
                expect(processedResponse).toEqual(stringedHashArray);
                done();
            });

    });

    test('Return hash with id if stringed hash found and returnId', done => {
        singleProcessor(stringedHash, keyId, jeOptionsIncludeId)
            .then(processedResponse => {
                expect(processedResponse).toEqual(hashResponseWithId);
                done();
            });

    });



    test('Return hash with custom id name if stringed hash found and returnId', done => {
        singleProcessor(stringedHash, keyId, jeOptionsIdName)
            .then(processedResponse => {
                expect(processedResponse).toEqual(changedIdNameHashResponse);
                done();
            });

    });

    test('Return string if returnRaw set', done => {
        singleProcessor(stringedHash, keyId, jeOptionsReturnRaw)
            .then(processedResponse => {
                expect(processedResponse).toEqual(stringedHash);
                done();
            });

    });

    test('Return num if returnRaw set', done => {
        singleProcessor(1, keyId, jeOptionsReturnRaw)
            .then(processedResponse => {
                expect(processedResponse).toEqual(1);
                done();
            });

    });

    test('Return null if null.', done => {
        singleProcessor(null, keyId, jeOptionsReturnRaw)
            .then(processedResponse => {
                expect(processedResponse).toEqual(null);
                done();
            });

    });

    test('Return null if 0.', done => {
        singleProcessor(null, keyId, jeOptionsReturnRaw)
            .then(processedResponse => {
                expect(processedResponse).toEqual(null);
                done();
            });

    });


});