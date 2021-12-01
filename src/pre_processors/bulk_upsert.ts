import crypto from 'crypto';
import {buildData} from '../helpers/build_data';
import {BulkInsertOptions} from '../types/MethodOptions';

async function bulkUpsertPreProcessor(params: BulkInsertParams, options: BulkInsertOptions) {
    
    
    const {
        key,
        data: passedData,
    } = params;
    const originDataAsHash = Array.isArray(passedData) ? {} : passedData;
    const data = Array.isArray(passedData) ? passedData.map(datum => {
        const id = crypto.randomUUID();
        const mappedParams = {
            ...params,
            data: datum,
        };
        const stringedData = buildData(mappedParams, options);
        originDataAsHash[id] = datum;
        return [id, stringedData];
        
    }) : Object.entries(passedData).map(([id, val]) => {
        const mappedParams = {
            ...params,
            data: val,
        };
        const stringedData = buildData(mappedParams, options);
        return [id, stringedData];
    });
    
    const flatIdValues: (string | number)[] = [];
    
    data.map(([id, val]) => {
        flatIdValues.push(id, val);
    });
    
    return {
        preProcessedParams: {
            ...params,
            data: flatIdValues,
            originDataAsHash,
        },
    };
    
    
}

export {bulkUpsertPreProcessor};