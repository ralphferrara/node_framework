//*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
//|| Node  :: Core :: Classes :: Directory
//|| Handles the storage of items in redis.
//||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

    /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
    //|| Class
    //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

    function Directory() {
        this.redisKey = 'BABL.DIRECTORY';
        this.list     = {};
        this.step     = 0;
    };

    /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
    //|| Initialize
    //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

    Directory.prototype.initialize = function(myCallback) {
        app.module("Redis").get(app.module("Directory").redisKey, function(myData, myErr) {
            console.log("DIRECTORY LIST : ");
            const util = require('util')
            console.log(util.inspect(myData, {showHidden: false, depth: null, colors: true}))
            if (myErr == null && myData != null) app.module("Directory").list = myData;
            if (typeof(myCallback) == 'function') myCallback();
        });
    };

    /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
    //|| Get
    //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

    Directory.prototype.get = function(mySite, mySection, myName, myCallback) {
        /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
        //|| Create Entry
        //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
        if (typeof(app.module("Directory").list[mySite]) == 'undefined')                       return myCallback(null);
        if (typeof(app.module("Directory").list[mySite][mySection]) == 'undefined')            return myCallback(null);
        if (typeof(app.module("Directory").list[mySite][mySection][myName]) == 'undefined')    return myCallback(null);
        /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
        //|| Set List
        //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
        app.module("Directory").list[mySite][mySection][myName].accessed = Date.now();
        /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
        //|| Store data to
        //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
        app.module("Redis").get(app.module("Directory").list[mySite][mySection][myName].key, function(myData, err){
            app.module("Directory").save(function(){ return myCallback(myData); });
        });
    };

    /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
    //|| Set
    //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

    Directory.prototype.set = function(mySite, mySection, myName, myData, myExpires, myCallback) {
        //console.log("DIRECTORY::SET=>" + mySite + '::' + mySection + '::' + myName + "["+myData.length+" bytes]");
        /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
        //|| Create Entry
        //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
        if (typeof(app.module("Directory").list[mySite]) == 'undefined') app.module("Directory").list[mySite] = {};
        if (typeof(app.module("Directory").list[mySite][mySection]) == 'undefined') app.module("Directory").list[mySite][mySection] = {};
        if (typeof(app.module("Directory").list[mySite][mySection][myName]) == 'undefined') app.module("Directory").list[mySite][mySection][myName] = {};
        /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
        //|| Set List
        //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
        app.module("Directory").list[mySite][mySection][myName].key      = app.module("Directory").key(mySite, mySection, myName);
        app.module("Directory").list[mySite][mySection][myName].expires  = (typeof(myExpires) == 'undefined') ? null : Date.now() + myExpires;
        app.module("Directory").list[mySite][mySection][myName].created  = Date.now();
        app.module("Directory").list[mySite][mySection][myName].accessed = Date.now();
        /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
        //|| Store data to
        //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/
        app.module("Redis").set(app.module("Directory").list[mySite][mySection][myName].key, myData, app.module("Directory").list[mySite][mySection][myName].expires, function(){
            //console.log("Saved the Key to " + app.module("Directory").list[mySite][mySection][myName].key + '[' + myData.length +' length]');
            //app.error.boot.ok("Set the Directory Item");
            app.module("Directory").save(myCallback);
        });
    };

    /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
    //|| Save the Directory to Redis
    //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

    Directory.prototype.save = function(myCallback) {
        //app.error.boot.ok("Saving Directory")
        app.module("Redis").set(app.module("Directory").redisKey, app.module("Directory").list, null, function(){ return app.call(myCallback); });
    };

    /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
    //|| Create the Key Name
    //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

    Directory.prototype.key = function(mySite, mySection, myName) {
        return mySite.toUpperCase() + ':' + mySection.toUpperCase() + ':' + myName.toLowerCase();
    };

    /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
    //|| Test Case
    //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

    Directory.prototype.test = function(myError, myData) {
        console.log("|| DIRECTORY TEST STEP " + app.module("Directory").step);
        app.module("Directory").step++;
        switch(app.module("Directory").step) {
            case 1 : return app.module("Directory").set('all', 'templates', '/primary/wrapper.html', '<h1>Hello</h1>', 10000, app.module("Directory").test); break;
            case 2 : return app.module("Directory").set('example.com', 'users', '/primary/wrapper.html' + app.module("Mathy").random(0,99999), '<h1>Hello</h1>', 10000, app.module("Directory").test); break;
            case 3 : return app.module("Directory").get('all', 'templates', '/primary/wrapper.html', app.module("Directory").test); break;
            case 4 : return app.module("Directory").get('babl.one', 'templates', '/primary/wrapper.html', app.module("Directory").test); break;
            case 5 : console.log("COMPLETED");
                     console.log(app.module("Directory").list);
                     setTimeout(function(){app.module("Redis").flush()}, 3000);
                     break;
        }
    }


    /*||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||
    //|| Done
    //||=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-||*/

    module.exports = Directory;

