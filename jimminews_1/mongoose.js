'use strict';

var
    path = require('path'),
    config = require('./config/config'),
    mongoose = require('mongoose');

module.exports.loadModels = function() {
    require('./models/user.server.model');
    require('./models/story.server.model');
};


// Initialize Mongoose
module.exports.connect = function(cb) {
    var _this = this;

    //mongoose.Promise = global.Promise;

    var db = mongoose.connect(config.db.uri, config.db.options, function(err) {
        // Log Error
        if (err) {
            console.error('Could not connect to MongoDB!');
            console.log(err);
        } else {

            // Call callback FN
            if (cb) cb(db);
        }
    });
};

module.exports.disconnect = function(cb) {
    mongoose.disconnect(function(err) {
        console.log('Disconnected from MongoDB.');
        cb(err);
    });
};