import {JeOptions} from './ClassOptions';

type CommonMethodOptions = JeOptions;
type MethodOptions<T> = T;

type NativeMethodOptions = {}
type ReturnRawOrIncludeId = {
    returnRaw: true
    returnId?: false
    idName?: string
} | {
    returnRaw?: false
    returnId: true
    idName?: string
}

type InsertRawOrOverWrite = {
    insertRaw: true
    overwrite: true
} | {
    insertRaw?: false
    overwrite?: boolean
}

type InsertRaw = {
    insertRaw?: JeOptions['insertRaw'];
}
type ReturnArray = {
    returnArray?: boolean
}
type UpdateOptions = JeOptions;
type InsertOptions = JeOptions;
type UpsertOptions = JeOptions;
type BulkInsertOptions = JeOptions;

type FindOneOptions = JeOptions;
export {
    CommonMethodOptions,
    MethodOptions,
    NativeMethodOptions,
    ReturnRawOrIncludeId,
    InsertRawOrOverWrite,
    InsertRaw,
    UpdateOptions,
    InsertOptions,
    UpsertOptions,
    BulkInsertOptions,
    FindOneOptions,
};