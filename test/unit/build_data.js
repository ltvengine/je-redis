const  {buildData} = require('./../../dist/helpers/build_data');
const {keyId, keyIdDataAsString, keyIdDataAsHash} = require('./../stuff/method_params')
const {defaultJeOptions, jeOptionsInsertRaw} = require('./../stuff/class_options');
const {hash} = require('./../stuff/data');

describe('Test data builder', () => {
    test('Test building raw string', done => {
        const data = buildData(keyIdDataAsString, jeOptionsInsertRaw);
        expect(data).toEqual(keyIdDataAsString.data);
        done();

    });

    test('Test building string from hash', done => {
        const data = buildData(keyIdDataAsHash, defaultJeOptions);
        expect(data).toEqual(JSON.stringify(hash));
        done();

    });


})