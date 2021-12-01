import {CommonMethodOptions} from '../types/MethodOptions';
import {MethodParams} from '../types/MethodParams';

type DeletionResult = string | number | null;

async function deletionProcessor(result: number, methodParams: MethodParams<any>, methodOptions: CommonMethodOptions): Promise<DeletionResult> {
    const {id} = methodParams;
    const {returnId} = methodOptions;
    
    return await new Promise(resolve => {
        returnId && !result && resolve(null);
        returnId && result && resolve(id);
        
        resolve(result);
    });
}

export {deletionProcessor};