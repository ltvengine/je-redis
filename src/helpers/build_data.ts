import {JeOptions} from '../types/ClassOptions';

function buildData(params: { data?: Record<string, any> | any[] | string | number }, options: { insertRaw?: JeOptions['insertRaw'] }) {
    const {data} = params;
    const {insertRaw} = options;
    
    const preBuiltData = !data ? insertRaw ? '{}' : {} : data;
    
    return insertRaw ? preBuiltData as string | number : JSON.stringify(preBuiltData);
    
}

export {buildData};