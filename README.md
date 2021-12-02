## About

A simple decorator for node-redis. Provides a set of methods to format I/O data and keys.

Check https://www.npmjs.com/package/redis to learn abt native lib.

I've been working on a bunch of Node.js micro-services for some time. Every service writes and reads a lot of hashes 
to/from Redis cache. And every one needs the outta-the-box patterns to process data that slightly differ.


The library name [ʒə ʁədi]  means 'I repeat/retell' in French.



## Installation

````shell
npm i @ltvengine/je-redis
````


## Usage

### Declaration

````javascript
import {JeRedis} from '@ltvengine/je-redis'

const jeRedisClient = new JeRedis(...[redisOptions, jeRedisOptions]);
````



### Native or retold
Je-Redis promisified native methods under the hood, but they are still available in the traditional callback-style.

````javascript
jeRedisClient.findOne({key: 'users', id: '1'}, ...someOptions) // Promise<Record | null>  

jeRedisClient.hget('users',  '1', (err, res) => {}) // "OK"  
````
And don't forget about the Node.js ability to promisify command.

````javascript
import {promisify} from 'util';


promisify(jeRedisClient.hget)('users', '1') // Promise<'{"name": "Thomas", "surname": "Anderson"}'>  
````

## Configuration
You can set the native Redis and Je-redis options on init.

Here are native Redis options:

https://github.com/redis/node-redis/blob/master/packages/client/lib/client/index.ts
### Basic config
````javascript
const jeRedisClient = new JeRedis(); 
````

### Je-Redis options

| option       | description                                                                                                    | type    | default |
|--------------|----------------------------------------------------------------------------------------------------------------|---------|---------|
| returnId     | Include field id in response.                                                                                  | boolean | false   |
| idName       | Name the field.                                                                                                | string  | null    |
| overwrite    | Overwrite entry on update.  If false - merge entries.                                                          | boolean | false   |
| returnRaw    | Return stringed data as is.                                                                                    | boolean | false   |
| insertRaw    | Insert string as is.                                                                                           | boolean | false   |
| returnArray  | Return all/multiple fileds entries as array  [entry, entry, ...entries] If false returns hash {[field]: entry} | boolean | false   |
| nullIfNoKeys | Return null if no fields for key  and returnArray is false                                                     | boolean | true    |


### Options priority
````javascript
// jeRedis options returnId is false
jeRedisClient.findOne({key: 'users', id: '2'})
.then(console.log) // {name: 'Thomas', surname: 'Anderson}


// jeRedis options returnId is true
jeRedisClient.findOne({key: 'users', id: '2'})
    .then(console.log) // {id: '2', name: 'Thomas', surname: 'Anderson}

// jeRedis options returnId is false  and includeName is 'id' but method options overwrite it
jeRedisClient.findOne(
    {key: 'users', id: 'ABCDE'}, 
    {returnId: true, idName: 'user_id'}
)
    .then(console.log) // {user_id: 'ABCDE', name: 'Thomas', surname: 'Anderson}
````

## Method params

| param | description                                                                                                                           | type                  |
|-------|---------------------------------------------------------------------------------------------------------------------------------------|-----------------------|
| key   | Redis key E.g. 'users', 'users:1:orders'                                                                                              | string                |
| id    | Redis key field.  We often need not to attach primitive values to fields  but rather store the whole object and later take it from DB | string                |
| data  | Data to store. N.B. je-redis can't update arrays or such  and actually such stuff is out of scope,  just prettier formatting.         | Object, Array, string |


## Methods

| method     	| description                                                                                                                  	| example                                                                                          	| response              	|
|------------	|------------------------------------------------------------------------------------------------------------------------------	|--------------------------------------------------------------------------------------------------	|-----------------------	|
| findOne    	| Gets entry for the key-field                                                                                                 	| jeRedis.findOne({key: 'employee_unformatted_data_heap', id: 'Johnson'})                          	| Object / null         	|
| findAll    	| Gets entries for the key as big hash or array                                                                                	| jeRedis.findAll({key: 'employee_unformatted_data_heap'})                                         	| Array / Object / null 	|
| insert     	| Creates entry if key-field doesn't exist. Generates UUID field name. If you want to provide your own key, use upsert method. 	| jeRedis.insert({key: 'strangers', data: {name: 'Dunno Lol', occupation: 'stranger'})             	| Object / null         	|
| upsert     	| Updates or creates entry. Manage merging entries with options.overwrite                                                      	| jeRedis.upsert({key: 'doctors', id: '123', data: {name: 'Strangelove', occupation: 'scientist'}) 	| Object                	|
| update     	| Updates entry. If key-field doesn't exist, returns null. Manage merging entries with options.overwrite                        | jeRedis.update({key: 'doctors', id: '123', data: {name: 'Strangelove', occupation: 'councellor'}) | Object      / null       	|
| bulkUpsert 	| Updates or creates multiple key-fields entries.                                                                              	| jeRedis.bulkUpsert({rows: [array of 1000 hashes], firstPage: [array of 10 hashes]})              	| Object                	|
| delete     	| Deletes entry and returns 1 or id.                                                                                           	| jeRedis.delete({key: 'mushrooms', id: 'psylo'})                                                  	| number / string       	|
| bulkDelete 	| Deletes multiple entries and returns number of deleted.                                                                      	| jeRedis.bulkDelete({key: 'mushrooms', id: ['psylo', 'agaric']})                                  	| number                	|
| close      	| Close connection and waits until it's over. Returns 0 status code if it's ok.                                                	| jeRedis.close()                                                                                  	| number                	|

Method accepts two argument hashes: params & options. 

## Errors
All errors are bubbling up to the caller, so it'd be the best not to forget about catch blocks.

## Tests
````shell
npm run test
````

## To do
- Add expiration settings to option interface.
- Make types more strict and clear.
- Develop a proper functionality for arrays.
- Process more cases with proper functions. 
- Enrich documentation with examples in different situations. 
- Provide ability to ``hget`` multiple, not all, ids` values.


 
## N.B.
Please keep in mind that usage cases for in-memory DBs concern fast writing-reading. 
If you need strict-typed schemas, better use them later with RDBMS to process data stored in Redis.


It means that if you save something weird to Redis with native method and then my stupid ``findOne`` crashes on it,
this crash will be your own responsibility.


Writing and reading the same key-ids with either Redis or Je-Redis in both cases is more reliable way.



Would be glad if this simple lib helps anyone to optimize routines.