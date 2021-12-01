import {buildData} from '../helpers/build_data';
import {UpdateOptions} from '../types/MethodOptions';
import {KeyIdDataParams} from '../types/MethodParams';

async function updatePreprocessor(params: KeyIdDataParams, options: UpdateOptions) {
    
    const {
        key,
        id: passedId,
        data: passedData,
    } = params;
    const {
        overwrite,
        insertRaw,
    } = options;
    const existingEntry = await this.findOne({
        key,
        id: passedId,
    });
    if (!existingEntry) {
        return null;
    }
    let data: string | number;
    if (overwrite || insertRaw === true) {
        data = buildData(params, options);
    } else {
        data = JSON.stringify({
            ...existingEntry, ...passedData as Record<string, any>,
        });
    }
    
    
    return {
        preProcessedParams: {
            ...params,
            id: passedId,
            data,
            
        },
    };
}

export {updatePreprocessor};