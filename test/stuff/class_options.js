const {changedIdName} = require('./id');

const defaultJeOptions = {
    returnId: false,
    idName: 'id',
    insertRaw: false,
    returnRaw: false,
    returnArray: true,
    nullIfNoKeys: true,
    overwrite: false,
};

const jeOptionsInsertRaw = {
    ...defaultJeOptions,
    insertRaw: true,
};

const jeOptionsIncludeId = {
    ...defaultJeOptions,
    returnId: true,

};

const jeOptionsIdName = {
    ...defaultJeOptions,
    returnId: true,
    idName: changedIdName,

};

const jeOptionsReturnRaw = {
    ...defaultJeOptions,
    returnRaw: true,

};

const jeOptionsReturnRawInsertRaw = {
    ...defaultJeOptions,
    returnRaw: true,
    insertRaw: true,

};


module.exports = {
    defaultJeOptions,
    jeOptionsInsertRaw,
    jeOptionsIncludeId,
    jeOptionsIdName,
    jeOptionsReturnRaw,
    jeOptionsReturnRawInsertRaw,
};