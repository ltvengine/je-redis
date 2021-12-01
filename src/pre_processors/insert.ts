import crypto from 'crypto';
import {buildData} from '../helpers/build_data';
import {InsertOptions} from '../types/MethodOptions';
import {KeyDataParams} from '../types/MethodParams';

async function insertPreprocessor(params: KeyDataParams, options: InsertOptions) {
    const id = crypto.randomUUID();
    
    const data = buildData(params, options);
    return {
        preProcessedParams: {
            ...params,
            id,
            data,
        },
    };
}

export {insertPreprocessor};