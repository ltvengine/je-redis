describe('Run tests.', () => {


    // Unit
    require('./unit/build_data');
    require('./unit/single_processor');

    // Class
    require('./class/init');
    require('./class/close');


    //Methods
    require('./methods/insert');
    require('./methods/find_one');
    require('./methods/upsert');
    require('./methods/bulk_upsert');
    require('./methods/find_all');
    require('./methods/find_ids');
    require('./methods/update');
    require('./methods/count_ids');
    require('./methods/delete');
    require('./methods/bulk_delete');


});