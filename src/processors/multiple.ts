import {parseArrayValues} from '../helpers/parse_array_values';
import {parseHashValues} from '../helpers/parse_hash_values';
import {KeyParams} from '../types/MethodParams';
import {MultipleResponse} from '../types/Response';

async function multipleProcessor(result: Record<string, any>, methodParams: KeyParams, methodOptions: Record<string, any>): Promise<MultipleResponse<any>> {
    
    return await new Promise(resolve => {
        const {
            returnRaw,
            returnId,
            idName,
            returnArray,
            nullIfNoKeys,
        } = methodOptions;
        
        !returnArray && nullIfNoKeys && !Object.keys(result).length && resolve(null);
        
        !returnArray && returnRaw && resolve(result);
        
        !returnArray && !returnRaw && returnId && resolve(parseHashValues(result, idName));
        !returnArray && resolve(parseHashValues(result));
        
        returnArray && returnRaw && resolve(Object.values(result));
        
        resolve(parseArrayValues(result, returnId && idName));
        
    });
}

export {multipleProcessor};