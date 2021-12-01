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
    overwrite: JeOptions['overwrite']
}

type InsertRaw = {
    insertRaw?: JeOptions['insertRaw'];
}
type UpdateOptions = InsertRawOrOverWrite & ReturnRawOrIncludeId & NativeMethodOptions;
type InsertOptions = ReturnRawOrIncludeId & NativeMethodOptions & InsertRaw;
type UpsertOptions = InsertRawOrOverWrite & ReturnRawOrIncludeId & NativeMethodOptions;
type BulkInsertOptions = InsertRawOrOverWrite & ReturnRawOrIncludeId & NativeMethodOptions;

type FindOneOptions = ReturnRawOrIncludeId & NativeMethodOptions;
export {CommonMethodOptions,
    MethodOptions,
    NativeMethodOptions,
    ReturnRawOrIncludeId,
    InsertRawOrOverWrite,
    InsertRaw,
    UpdateOptions,
    InsertOptions,
    UpsertOptions,
    BulkInsertOptions,
    FindOneOptions}