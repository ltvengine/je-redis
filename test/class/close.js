const {JeRedis} = require('./../../dist');


describe('Closing connection', () => {
    test('Should close connection.', done => {
        let err = null;

        let jeRedis = new JeRedis();
        const spyOnClose = jest.spyOn(jeRedis, 'close');
        jeRedis.close()
            .then(closeStatus => {
                expect(closeStatus).toEqual(0);
                return closeStatus;
            })
            .catch(error => {
                err = error;
            })
            .then(closeStatus => {
                expect(err).toBeNull();
                expect(spyOnClose).toBeCalled();
                expect(closeStatus).toEqual(0);
                done();
            });

    }, 7000);

});