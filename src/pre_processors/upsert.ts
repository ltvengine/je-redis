import {buildData} from '../helpers/build_data';
import {UpsertOptions} from '../types/MethodOptions';

async function upsertPreprocessor(params: KeyIdDataParams, options: UpsertOptions) {
    
    
    const {
        key,
        id: passedId,
        data: passedData,
    } = params;
    const {
        overwrite,
        insertRaw,
    } = options;
    
    let existingEntry: Record<string, any> | any[];
    let parsedExistingData: Record<string, any> | any[];
    let data: Record<string, any>;
    if (!insertRaw && !overwrite) {
        existingEntry = await this.findOne({
            key,
            id: passedId,
        });
        parsedExistingData = existingEntry || {};
        data = {
            ...parsedExistingData, ...passedData as Record<string, any>,
        };
        params.data = data;
    }
    const stringedData = buildData(params, options);
    return {
        preProcessedParams: {
            ...params,
            id: passedId,
            data: stringedData,
        },
    };
}

export {upsertPreprocessor};