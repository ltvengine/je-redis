import {FindOneOptions, InsertOptions, UpdateOptions} from '../types/MethodOptions';

async function singleProcessor(result: Raw, processedParams: KeyIdParams, methodOptions: UpdateOptions | InsertOptions | FindOneOptions): Promise<SingleResponse> {
    return await new Promise(resolve => {
        (result === null || result === 0) && resolve(null);
        // const resultData: Record<string, any> | string | number | any[] = processedParams.data;
        const {
            returnRaw,
            returnId,
            idName,
        } = methodOptions;
        const {id} = processedParams;
        
        returnRaw && resolve(result);
        
        
        const parsedData = JSON.parse(result as string);
        
        Array.isArray(parsedData) && (returnId ? resolve({[id]: parsedData as any[]}) : resolve(parsedData as any[]));
        
        !returnId && resolve(JSON.parse(result as string));
        resolve({
            ...parsedData,
            [idName as string]: id,
        });
        
    });
    
}

export {singleProcessor};