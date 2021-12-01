import {parseArrayValues} from '../helpers/parse_array_values';
import {parseHashValues} from '../helpers/parse_hash_values';
import {CommonMethodOptions} from '../types/MethodOptions';

async function idsProcessor(result: Record<string, any>, methodParams: MethodParams<any>, methodOptions: CommonMethodOptions): Promise<SingleResponse | MultipleResponse> {
    
    const {
        returnRaw,
        returnId,
        idName,
        returnArray,
        nullIfNoKeys,
    } = methodOptions;
    
    return await new Promise(resolve => {
        !returnArray && nullIfNoKeys && !Object.keys(result).length && resolve(null);
        
        !returnArray && returnRaw && resolve(result);
        
        !returnArray && !returnRaw && returnId && resolve(parseHashValues(result, idName));
        
        returnArray && returnRaw && resolve(Object.values(result));
        
        resolve(parseArrayValues(result, returnId && idName));
    });
    
}

export {idsProcessor};