const {JeRedis} = require('./../../dist');
const {defaultJeOptions} = require('./../stuff/class_options');
describe('Test instance creation', () => {

    let jeRedis = null;


    afterEach(done => {
        if (jeRedis) {
            jeRedis.close()
                .then(() => {
                    jeRedis = null;
                    done();
                })
                .catch(ex => {
                     done();
                });
        } else {
            jeRedis = null;
            done();
        }
    }, 10000);

    test('Should create class.', done => {
        try {
            jeRedis = new JeRedis();
            expect(jeRedis).toBeInstanceOf(JeRedis);
            done();
        } catch (ex) {
            done();
        }

    });

    test('Should throw error with bad options format.', done => {
        let err;
        try {
            jeRedis = new JeRedis('Bad options format');
        } catch (error) {
            err = error;

        }
        expect(jeRedis).toEqual(null);
        expect(err).toBeInstanceOf(Error);


        done();
    });

    test('Should throw error with bad Je options format.', done => {
        let err;
        try {
            jeRedis = new JeRedis({}, 'Bad je options');
        } catch (error) {
            err = error;

        }
        expect(jeRedis).toEqual(null);
        expect(err).toBeInstanceOf(Error);


        done();
    });

    test('Instance should have options', done => {

        jeRedis = new JeRedis();
        expect(jeRedis).toHaveProperty('jeOptions');
        expect(jeRedis.jeOptions).toEqual(defaultJeOptions);

        done();
    });
});

