/*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Node  :: Core :: Classes
//|| Class :: MYSQL
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

    /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
    //|| Class
    //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

    function MySQL() {
        this.connected  = false;
        this.client     = false;
        this.pool       = false;
        this.client     = require('mysql');
    };

    /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
    //|| Connect
    //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

    MySQL.prototype.connect = function()  {
        if (typeof(app.conf.app.services.mysql) == 'undefined') return app.error.fatal.quit( 'Config file missing [mysql.json]');
        if (typeof(app.conf.app.services.mysql) == 'undefined') return app.error.fatal.quit( 'MYSQL configuration for this application ['+app.appName+'] is not defined in mysql.json');
        this.pool = this.client.createPool({
            'connectionLimit'         : 25,
            'multipleStatements'      : true,
            'host'                    : app.conf.app.services.mysql.host,
            'user'                    : app.conf.app.services.mysql.user,
            'password'                : app.conf.app.services.mysql.password,
            'database'                : app.conf.app.services.mysql.database,
            'charset'                 : app.conf.app.services.mysql.charset
        });
        this.pool.on('acquire', function (connection) {
            //connection.query("SET collation_connection = "+app.config.mysql.collate+";");
        });
        this.pool.on('release', function (connection) {
        });
        app.module("MySQL").pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
              if (error) throw error;
              app.error.boot.ok( 'MYSQL CONNECTED! QUERY RESULT : ' +  results[0].solution);
        });
        app.error.boot.ok('Connected to MYSQL');
    };

    /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
    //|| Set Collate
    //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

    MySQL.prototype.setCollate = function() {
        app.error.boot.ok('boot', 'MYSQL :: Attempting to SET MYSQL Collate');
        app.module("MySQL").pool.query("SET collation_connection = "+app.config.mysql.collate+";", [], function(queryError, myRows){
           if (queryError != null) {
                app.error.boot.ok('boot.fail', 'MYSQL::COLLATION SET FAILED');
                console.log(queryError);
                process.exit();
           }
           app.error.boot.ok( 'MYSQL::COLLATION SET! -> ' + "SET collation_connection = '"+app.config.mysql.collate+"';");
            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Check Collate
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
           return app.module("MySQL").checkCollate();
        });
    };

    /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
    //|| Set Collate
    //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

    MySQL.prototype.checkCollate = function() {
       app.error.boot.ok('boot', 'MYSQL :: Checking MYSQL Collate');
        app.module("MySQL").pool.query("SHOW variables WHERE variable_name = 'collation_connection';", [], function(queryError, myRows) {
           if (queryError != null) {
                app.error.boot.ok('boot.fail', 'MYSQL::COLLATION QUERY FAILED');
                console.log(queryError);
                process.exit();
           }
           if (typeof(myRows) != 'object' || myRows.length == 0) {
                app.error.boot.ok('boot.fail', 'MYSQL::COLLATION RECORDSET EMPTY');
                console.log(myRows);
                process.exit();
           }
           if (myRows[0].Value != app.config.mysql.collate) {
                app.error.boot.ok('boot.fail', 'MYSQL::COLLATION CHECK :: MISMATCH!');
                app.error.boot.ok('boot.fail', 'System [' + myRows[0].Value  + '] != Config['+app.config.mysql.collate+']');
                process.exit();
           }
           app.error.boot.ok( 'COLLATION SET TO : ' + myRows[0].Value);
            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Check Timezone
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
            return app.module("MySQL").checkTZ();
        });
    };

    /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
    //|| Check Timezone
    //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

    MySQL.prototype.checkTZ = function()  {
        app.error.boot.ok('boot', 'MYSQL :: Checking TimeZone');
        /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
        //|| Get the Connection
        //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
        var tzQuery  = this.pool.query("SELECT @@system_time_zone as myTimeZone; ", [], function(queryError, myRows){
            if (queryError != null) {
                console.log('MYSQL::TIMEZONE-CHECK::FAILED');
                console.log(queryError);
                process.exit();
                return;
            }
            if (typeof(myRows[0]) == 'undefined' || typeof(myRows[0].myTimeZone) == 'undefined') {
                console.log('MYSQL::TIMEZONE-CHECK::EMPTY RECORDSET');
                console.log(myRows);
                process.exit();
                return;
           }
            if (myRows[0].myTimeZone != 'UTC') {
                console.log('MYSQL::TIMEZONE-CHECK FAIL! - TIMEZONE NOT UTC!!!');
                console.log("Time Zone is set to " + myRows[0].myTimeZone);
                process.exit();
                return;
           }
           app.error.boot.ok( 'MYSQL :: Timezone is correctly set to UTC');
        });
    };

    /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
    //|| Get Connection
    //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

    MySQL.prototype.query = function(myRecordset, callBack)  {
        /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
        //|| Log
        //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
        var theSQL = app.module("Str").clearLines(myRecordset.sql);
        theSQL = app.module("Str").clearLines(theSQL);
        /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
        //|| Get the Connection
        //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
        var myQuery         = {};
        myQuery.callback    = callBack;
        myQuery.recordset   = myRecordset;
        myQuery.query       = app.module("MySQL").pool.query(myRecordset.sql, myRecordset.array, function(queryError, myRows){
            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Errors
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
            myQuery.recordset.outputSQL   = myQuery.query.sql;
            if (queryError != null) {
                console.log('|---| QUERY ERROR -- -------------------------------------------');
                console.log(queryError);
                myQuery.recordset.status = false;
                app.error.boot.ok('query.error', myQuery.query.sql, 'MySQL', queryError);
                return myQuery.callback(myRecordset);
            }
            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Start
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
            //app.error.boot.ok('query', 'QUERY SUCCESS (' +  theSQL + ')', 'MySQL');
            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Result Data
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
            if (myRows != null) {
                myQuery.recordset._id             = (typeof(myRows.insertId) == 'number')     ? myRows.insertId        : false;
                myQuery.recordset._affected       = (typeof(myRows.affectedRows) == 'number') ? myRows.affectedRows    : false;
                myQuery.recordset._status         = 'OK';
                myQuery.recordset._rows           = myRows;
                myQuery.recordset._count          = myRows.length;
            }
            /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
            //|| Done
            //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
            return myQuery.callback(myRecordset);
        });
    };


    /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
    //|| Export Class
    //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

    module.exports = MySQL;
