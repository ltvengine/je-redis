 type JeRedisParams = {
    returnId?: boolean
}

type KeyParams = {
    key: string
}


type KeyDataParams = {
    key: string
    id?: string
    data: Record<string, any>
}

type KeyIdDataParams = {
    key: string
    id: string
    data: Record<string, any> | string
}

type PreProcessedParams = {
    data: string | number
} & KeyIdParams;


type KeyIdParams = {
    key: string
    id: string
}

type CommonParams = {
    key: string
    id?: string
    data?: { [p: string]: any }
    stringedData?: string
}

type MethodParams<CustomParams> = {
    key: string
} & CustomParams;

type UpdateParams = KeyIdDataParams;
type UpsertParams = KeyIdDataParams;
type BulkInsertParams = KeyParams & { data: Record<string, any> | any[] };


