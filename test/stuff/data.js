const _string = 'Some stringed data';
const num = 123456;

const hash = {
    name: 'Thomas',
    surname: 'Anderson'
};

const stringedHash = JSON.stringify(hash);

const array = ['Raw string', 'Another raw string', _string, num];

const hashArray = [hash, hash, hash];
const stringedArray = JSON.stringify(array);

const stringedHashArray = JSON.stringify(hashArray);
const multiData = {
    head: {
        cols: ['a', 'b', 'c']
    },
    body: {
        content: {
            article: 'Article',
            aside: {
                fontSize: 12,
                content: 'Aside'
            }
        }
    },
    footer: {
        fontSize: 12,
        content: 'Footer'
    }

}

module.exports = {
    hash,
    array,
    hashArray,
    stringedHash,
    _string,
    num,
    stringedArray,
    stringedHashArray,
    multiData
};