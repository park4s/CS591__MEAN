var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var StringParam = require('../models/string.js');

router.get('/:named', function(req, res, next) {
    var namedParameter = req.params.named;
    var length = namedParameter.length;
    StringParam.findOne({
        string: namedParameter
    }).exec(function(err, string) {
        if (err) {
            //error in find
            res.status(410).json({
                message: 'Error in find'
            });
        } else {
            if (!string) {
                //not found, we need to create new string and then save into mongodb

                var newString = new StringParam({
                    string: namedParameter,
                    length: length
                });
                newString.save(function(err) {
                    if (err) {
                        //error while saving new string into database
                        res.status(410).json({
                            message: 'Error in save'
                        });
                    } else {
                        res.json(newString);

                    }
                });
            } else {
                //found
                res.json(string);
            }
        }
    });
});

//2nd Route
router.get('/', function(req, res, next) {
    StringParam.find({}) //find all
        .exec(function(err, stringParams) { //execute the query
            if (err) {
                //return the error
                res.status(410).json({
                    message: 'Error in find'
                });
            } else {
                //return the json array
                res.json(stringParams);
            }
        });
});

router.post('/', function(req, res, next) {
    var namedParameter = req.body.string;
    var length = namedParameter.length;
    //1. Return the prompt message if nothing is provided
    if (!namedParameter) {
        res.status(410).json({
            message: 'Please provide the string'
        });
    }
    //2. Find the string with same name as input
    StringParam.findOne({
        string: namedParameter
    }).exec(function(err, string) {
        if (err) {
            //3. error in find , display the message
            res.status(410).json({
                message: 'Error in find'
            });
        } else {
            if (!string) {
                //4. not found, we need to create new string and then save into mongodb
                var newString = new StringParam({
                    string: namedParameter,
                    length: length
                });
                newString.save(function(err) {
                    if (err) {
                        //error while saving new string into database
                        res.status(410).json({
                            message: 'Error in save'
                        });
                    } else {
                        //5. Saved successfully, return it to the client
                        res.json(newString);
                    }
                });
            } else {
                //6. found so return it to the client, no need to create a new record here
                res.json(string);
            }
        }
    });
});

router.delete('/:string', function(req, res) {
    var string = req.params.string;
    //1. Find the string in database
    StringParam.findOne({
        string: string
    }).exec(function(err, stringParam) {
        if (err) {
            res.status(410).json({
                message: 'Error in delete'
            });
        } else {

            if (!stringParam) {
                //2. Not found so send the message
                res.json({
                    message: string + ' was not found'
                });
            } else {
                //3. Found , so call remove to delete the record
                stringParam.remove(function(err) {
                    if (err) {
                        //4. Error in delete
                        res.status(410).json({
                            message: 'error in remove'
                        });
                    } else {
                        //5. Delete successful
                        res.json({
                            message: 'removed successfully'
                        })
                    }
                });
            }
        }
    });
});


module.exports = router;