import Joi from 'joi';
import {MethodValidation, VariousValidation} from '../types/MethodsCommon';

const key = {
    key: Joi.string().required(),
};

const data = {
    data: Joi.object({}).unknown(true),
};


const common = {
    ...key,
    id: Joi.string().required(),
};

const keyWData = {
    ...key,
    ...data,
};

const commonWData = {
    ...common,
}
const methodParams: MethodValidation = {

    findOne: Joi.object({
        ...common,
    }),
    findAll: Joi.object({
        ...key,
    }),
    insert: Joi.object({
        ...keyWData,
    }),
    update: Joi.object({
        ...common,
        data: Joi.object().unknown(true).min(1).required()
    }),
    delete: Joi.object({
        ...common,
    }),
    findIds: Joi.object({
        ...key
    }),
    countIds: Joi.object({
        ...key
    }),
}

const commonOptions = {
    returnId: Joi.boolean(),
    idName: Joi.string(),
    insertRaw: Joi.boolean(),
    returnRaw: Joi.boolean(),
    idsAsArray: Joi.boolean()
}

const variousSchemas: VariousValidation = {
    jeOptions: Joi.object({
        ...commonOptions
    }).and('returnId', 'idName'),
    methodOptions:  Joi.object({
        TTL: Joi.number().positive(),
        ...commonOptions
    }).and('returnId', 'idName')
    
}




export {methodParams,  variousSchemas};