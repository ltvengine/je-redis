import {ClientOpts} from 'redis';

 type JeOptions = {
    returnId?: true | false
    idName?: string
    insertRaw?: true | false
    returnRaw?: true | false
    returnArray?: true | false
    nullIfNoKeys?: true | false
    overwrite?: true | false
}

type JeRedisOptions = {
    je?: JeOptions
    redis?: ClientOpts
}

