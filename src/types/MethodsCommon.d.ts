import Joi from 'joi';
import {CommonMethodOptions} from './MethodOptions';

type MethodNames =
    'findOne'
    | 'findAll'
    | 'insert'
    | 'upsert'
    | 'update'
    | 'delete'
    | 'findIds'
    | 'countIds'
    | 'end'
    | 'bulkUpsert                    '
    | 'bulkUpdate'
    | 'bulkUpsert'
    | 'bulkDelete';


type Method = (params: CommonParams, options: CommonMethodOptions) => Promise<any>
type MethodValidation = {
    [key in MethodNames]?: Joi.Schema
}
type InsertedData = {
    [key: string]: any
}

type VariousValidation = {
    [p: string]: Joi.Schema
}

type PreProcessedMethodArgs<O> = {
    params: PreProcessedParams
    options: O
    nativeOptions?: any[]
}

export {MethodNames, PreProcessedMethodArgs, Method, InsertedData, MethodValidation, VariousValidation};