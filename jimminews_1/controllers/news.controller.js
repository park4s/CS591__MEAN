'use strict';

/**
 * Module dependencies
 */

var path = require('path'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    request = require('request'),
    config = require('../config/config');
var User = mongoose.model('User');
var Story = mongoose.model('Story');
var guardianAPIKey = config.theGuardian.apiKey;
var newsPageSize = 5;
guardianAPIKey = 'test';
var guardianURL = 'https://content.guardianapis.com/search?api-key=' + guardianAPIKey + '&page-size=' + newsPageSize;

//news are retreived using getAllNews

var getAllNews = exports.getAllNews = function(req, res) {
    if (!req.user) {
        res.status(403).json({
            status: 'Failed',
            message: 'Unauthorized Request'
        })
    }

    request(guardianURL, {}, function(err, response) {
        if (err) {
            res.status(410).json({
                status: 'Failed',
                message: 'Unable to process Request'
            });
        } else {
            response = JSON.parse(response.body);
            res.json(response);
        }
    });
};

//getWeather API retreives weather

exports.getWeather = function(req, res) {
    var weatherURL = "https://weathers.co/api.php?city=Boston+MA";
    request(weatherURL, {}, function(err, response) {
        if (err) {
            res.status(410).json({
                status: 'Failed',
                message: 'Unable to process Request'
            })
        } else {
            response = JSON.parse(response.body);
            console.log(JSON.stringify(response));
            res.json(response.data);
        }
    });
};
//getFavorites fetches all favorites for logged in user
exports.getFavorites = function(req, res) {
    Story.find({
        user: req.user
    }).exec(function(err, stories) {
        res.json(stories);
    });
};
//saveNewsItem will add a news story to your liked items

exports.saveNewsItem = function(req, res) {
    var user = req.user;
    var content = req.body;
    var id = content.id;
    var story = new Story({
        user: user,
        id: id,
        content: content
    });
    story.save(function(err) {
        if (err) {
            console.log('err ' + err);
            console.log(JSON.stringify(err));
            res.status(410).json({
                message: ' Error'
            })
        } else {
            res.json(story);
        }
    });
};

//removes the like

exports.deleteNewsItem = function(req, res) {
    var id = req.body.id;
    console.log(JSON.stringify(req.body));
    console.log('id ' + id);
    Story.findOne({
        id: id
    }).exec(function(err, story) {
        if (err || !story) {
            return res.status(410).json({
                message: ' Unable to find story with this id'
            });
        } else {
            console.log('story');
            console.log(JSON.stringify(story));
            story.remove(function(err) {
                if (err) {

                    res.status(410).json({
                        message: ' Unable to remove story'
                    });
                } else {
                    res.json({
                        message: 'Success'
                    });
                }
            });
        }
    });
};