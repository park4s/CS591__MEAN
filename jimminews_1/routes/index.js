/*
 this has declaration for all the apis
 twitter/news/weather
 this is how APIs are created..

 functions are called from newsController and users controller
 */

var express = require('express');
var router = express.Router();
var users = require('../controllers/user.controller');
var newsController = require('../controllers/news.controller');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendfile('./public/index.html');
});

// Setting the twitter oauth route
router.get('/api/auth/twitter', users.oauthCall('twitter'));

router.get('/api/auth/twitter/callback', users.oauthCallback('twitter'));


router.get('/api/news', users.isAuthenticated, newsController.getAllNews);
router.get('/api/news/favorites', users.isAuthenticated, newsController.getFavorites);

router.post('/api/news', users.isAuthenticated, newsController.saveNewsItem);
router.delete('/api/news', users.isAuthenticated, newsController.deleteNewsItem);

router.get('/api/weather', newsController.getWeather);
module.exports = router;