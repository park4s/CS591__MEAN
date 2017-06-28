'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    path = require('path'),
    config = require(path.resolve('./config/config')),
    Schema = mongoose.Schema;

/**
 * Story Schema
 */
var StorySchema = new Schema({
    content: {
        type: Object
    },
    id: {
        type: String
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

mongoose.model('Story', StorySchema);