import {ClientOpts, RedisClient} from 'redis';
import {promisify} from 'util';

// import {validateInput} from './decorators/@validate_input';
import {validateData} from './helpers/validate_data';
import {bulkUpsertPreProcessor} from './pre_processors/bulk_upsert';
import {insertPreprocessor} from './pre_processors/insert';
import {updatePreprocessor} from './pre_processors/update';
import {upsertPreprocessor} from './pre_processors/upsert';
import {deletionProcessor} from './processors/deletion';
import {multipleProcessor} from './processors/multiple';
import {singleProcessor} from './processors/single';
import {JeOptions} from './types/ClassOptions';
import {
    BulkInsertOptions, CommonMethodOptions, FindOneOptions, InsertOptions, UpdateOptions, UpsertOptions,
} from './types/MethodOptions';


type PromisifiedMethod<R> = (...args: any) => Promise<R>;


class JeRedis extends RedisClient {
    
    
    #hget: PromisifiedMethod<string> = promisify(this.hget).bind(this);
    
    #hset: PromisifiedMethod<number> = promisify(this.hset).bind(this);
    
    #hsetnx: PromisifiedMethod<number> = promisify(this.hsetnx).bind(this);
    
    #hkeys: PromisifiedMethod<string[]> = promisify(this.hkeys).bind(this);
    
    #hlen: PromisifiedMethod<number> = promisify(this.hlen).bind(this);
    
    #hdel: PromisifiedMethod<number> = promisify(this.hdel).bind(this);
    
    #hgetall: PromisifiedMethod<Record<string, string>> = promisify(this.hgetall).bind(this);
    
    #insertPreprocessor = insertPreprocessor;
    
    #updatePreprocessor = updatePreprocessor;
    
    #upsertPreprocessor = upsertPreprocessor;
    
    #deletionProcessor = deletionProcessor;
    
    #multipleProcessor = multipleProcessor;
    
    #singleProcessor = singleProcessor;
    
    #bulkUpsertPreProcessor = bulkUpsertPreProcessor;
    
    jeOptions: JeOptions = {
        returnId: false,
        idName: 'id',
        insertRaw: false,
        returnRaw: false,
        returnArray: true,
        nullIfNoKeys: true,
        overwrite: false,
    };
    
    constructor(redisOptions?: ClientOpts, jeOptions?: JeOptions) {
        super(redisOptions);
        if (jeOptions) {
            validateData({jeOptions});
        }
        
        const mergedOptions = this.#mergeOptions(jeOptions);
        this.jeOptions = Object.freeze(mergedOptions);
        
    }
    
    #mergeOptions(options: JeOptions) {
        return options ? {
            returnId: options.returnId || this.jeOptions.returnId,
            idName: options.idName || this.jeOptions.idName,
            insertRaw: options.insertRaw || this.jeOptions.insertRaw,
            returnRaw: options.returnRaw || this.jeOptions.returnRaw,
            returnArray: options.returnArray || this.jeOptions.returnArray,
            nullIfNoKeys: options.nullIfNoKeys || this.jeOptions.nullIfNoKeys,
            overwrite: options.overwrite || this.jeOptions.overwrite,
        } : this.jeOptions;
    }
    
    
    #mergeMethodOptions<T>(methodOptions: JeOptions = this.jeOptions) {
        const {jeOptions} = this;
        Object.entries(jeOptions).map(([key, val]: [keyof JeOptions, any]) => {
            if (typeof methodOptions[key] !== 'boolean' && typeof methodOptions[key] !== 'string') {
                // @ts-ignore
                methodOptions[key] = val;
            }
        });
        return methodOptions as T;
    }
    
    
    /**
     * Returns entry found for key-id.
     * @param {KeyIdParams} params
     * @param {FindOneOptions} options
     * @return {Promise<SingleResponse>}
     */
    async findOne(params: KeyIdParams, options?: FindOneOptions): Promise<SingleResponse> {
        options = this.#mergeMethodOptions(options);
        
        return await this.#hget(params.key, params.id)
            .then(result => this.#singleProcessor(result, params, options));
    }
    
    
    /**
     * Returns the child entries.
     * If returnArray option is true, returns array. Else returns object or null if nullIfNoKeys set to `true` and no
     * ids found for key.
     * @param {KeyIdParams} params
     * @param {CommonMethodOptions} options
     * @return {Promise<MultipleResponse>}
     */
    async findAll(params: KeyIdParams, options?: CommonMethodOptions): Promise<MultipleResponse> {
        options = this.#mergeMethodOptions(options);
        
        return await this.#hgetall(params.key)
            .then(result => this.#multipleProcessor(result || {}, params, options));
    }
    
    
    /**
     * Insert entry if it doesn't exist for this key-id.
     * @param {KeyDataParams} params
     * @param {InsertOptions} options
     * @return {Promise<SingleResponse>}
     */
    async insert(params: KeyDataParams, options?: InsertOptions): Promise<SingleResponse> {
        options = this.#mergeMethodOptions(options);
        return await this.#insertPreprocessor(params, options)
            .then(async preProcessed => {
                if (!preProcessed) {
                    return null;
                }
                const {
                    preProcessedParams,
                    preProcessedParams: {
                        key,
                        id,
                        data,
                    },
                    
                } = preProcessed;
                return await this.#hsetnx(key, id, data)
                    .then(result => this.#singleProcessor(result ? data : null, preProcessedParams, options));
            });
    }
    
    /**
     * Inserts multiple entries for ids
     * @param {BulkInsertParams} params
     * @param {BulkInsertOptions} options
     * @return {Promise<MultipleResponse>}
     */
    async bulkUpsert(params: BulkInsertParams, options: BulkInsertOptions): Promise<MultipleResponse> {
        options = this.#mergeMethodOptions(options);
        
        return await this.#bulkUpsertPreProcessor(params, options)
            .then(async preProcessed => {
                const {
                    preProcessedParams,
                    preProcessedParams: {
                        key,
                        data,
                        originDataAsHash,
                    },
                    
                } = preProcessed;
                return await this.#hset(key, ...data)
                    .then(() => this.#multipleProcessor(originDataAsHash, preProcessedParams, {
                        ...options,
                        returnRaw: true,
                    }));
            });
    }
    
    
    /**
     * Updates or inserts entry  for key-id pair.
     * @param {UpsertParams} params
     * @param {UpsertOptions} options
     * @return {Promise<SingleResponse>}
     */
    async upsert(params: UpsertParams, options: UpsertOptions): Promise<SingleResponse> {
        options = this.#mergeMethodOptions(options);
        
        return await this.#upsertPreprocessor(params, options)
            .then(({
                       preProcessedParams: {
                           key,
                           id,
                           data,
                       },
                       preProcessedParams,
                       
                   }) => this
                .#hset(key, id, data)
                .then(() => this.#singleProcessor(data, preProcessedParams, options)));
        
    }
    
    
    /**
     * Updates piece of data fully or merging with passed. Returns null if id not found.
     * @param {KeyIdDataParams} params
     * @param {UpdateOptions} options
     * @return {Promise<SingleResponse>}
     */
    async update(params: KeyIdDataParams, options: UpdateOptions): Promise<SingleResponse> {
        options = this.#mergeMethodOptions(options);
        
        return await this.#updatePreprocessor(params, options)
            .then(async preProcessedArgs => {
                if (!preProcessedArgs) {
                    return null;
                }
                const {
                    preProcessedParams,
                    preProcessedParams: {
                        key,
                        id,
                        data,
                    },
                    
                } = preProcessedArgs;
                return await this.#hset(key, id, data)
                    .then(() =>  this.#singleProcessor(data, preProcessedParams, options));
            });
    }
    
    
    /**
     * Returns array of children ids as strings.
     * @param {KeyParams} params
     * @return {Promise<string[]>}
     */
    async findIds(params: KeyParams): Promise<string[]> {
        return await this.#hkeys(params.key);
    }
    
    
    /**
     * Returns the number of children keys.
     * @param {KeyParams} params
     * @return {Promise<number>}
     */
    async countIds(params: KeyParams): Promise<number> {
        return await this.#hlen(params.key);
    }
    
    
    /**
     * Returns 1 if deleted, 0 if not. If returnId set to `true` returns passed id when deleted or null when not.
     * @param {KeyIdParams} params
     * @param {CommonMethodOptions} options
     * @return {Promise<string | number | null>}
     */
    async delete(params: KeyIdParams, options: CommonMethodOptions): Promise<string | null | number> {
        options = this.#mergeMethodOptions(options);
        
        return await this.#hdel(params.key, params.id)
            .then(result => this.#deletionProcessor(result, params, options));
    }
    
    
    /**
     * Returns 1 if deleted, 0 if not. If returnId set to `true` returns passed id when deleted or null when not.
     * @param {{id: string, key: string}} params
     * @param {CommonMethodOptions} options
     * @return {Promise<number>}
     */
    async bulkDelete(params: { id: string, key: string }, options: CommonMethodOptions): Promise<number> {
        return await this.#hdel(params.key, ...params.id);
    }
    
    
    /**
     *  Returns exit code 0 on full connection close.
     * Useful in testing (Native Redis lib often can't quit before test process exits).
     * @param {boolean} flush
     * @return {Promise<number>}
     */
    async close(flush: boolean = false): Promise<number> {
        
        
        this.end(flush);
        while (this.connected) {
            await new Promise(r => setTimeout(r, 200));
        }
        
        
        // redis.quit() creates a thread to close the connection.
        // We wait until all threads have been run once to ensure the connection closes.
        // await new Promise(resolve => setImmediate(resolve));
        return 0;
    }
}

export {JeRedis};
