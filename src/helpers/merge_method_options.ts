import {JeOptions} from '../types/ClassOptions';

function mergeMethodOptions(methodOptions: JeOptions = {}) {
    const {jeOptions} = this;
    return {
        
        returnId: methodOptions.returnId || jeOptions.returnId,
        idName: methodOptions.idName || jeOptions.idName,
        insertRaw: methodOptions.insertRaw || jeOptions.insertRaw,
        returnRaw: methodOptions.returnRaw || jeOptions.returnRaw,
        returnArray: methodOptions.returnArray || jeOptions.returnArray,
        nullIfNoKeys: methodOptions.nullIfNoKeys || jeOptions.nullIfNoKeys,
        overwrite: methodOptions.overwrite || jeOptions.overwrite,
    };
}

export {mergeMethodOptions};