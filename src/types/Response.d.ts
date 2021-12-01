type Raw = string | null | number;
type Processed =  Record<string, any> | any[] | string | number;
type Entry<IdName extends string | 'id', ReturnId extends boolean> = ReturnId extends true ? {
        [key in IdName]:  string
    } :
    {[key in IdName]?: string} &
    Record<string, any>

type ReturnedEntry<ReturnId extends boolean, IdName extends string, ReturnRaw extends boolean>   =  ReturnRaw extends true ?
    Raw :
    Entry<IdName, ReturnId>;

type SingleResponse  =  null | string | number | Record<string, any> | any[] ;
type MultipleResponse  = Record<string, any> | null | any[];