
/**
 * This code for first page..
 * $http is making a call to add favorites, remove favorites
 */
angular.module('MainCtrl', []).controller('MainController', function($scope, $window, $cookies, $http) {
    $scope.cookie = $cookies.get('sessionId');
    $scope.loggedIn = $scope.cookie ? true : false;
    console.log($scope.cookie);
    $scope.tagline = 'Best News Service!';
    $scope.callOauthProvider = function(url) {
        console.log('Twitter ' + url);
        // Effectively call OAuth authentication route:
        $window.location.href = url;

    };
/*
 this gets information about weather
 */
    $scope.news = [];
    $scope.loadWeather = function() {
        $http.get('/api/weather').then(function(response) {
            console.log(response);
            $scope.weather = response.data;

            console.log($scope.weather);
        }, function(err) {
            console.log('error to load weather ' + JSON.stringify(err));
        });
    };
    $scope.loadWeather();
   /* this gets information about weather.
    it will get news only if logged in.
    /api/news API has that functionality.

    */
    $scope.loadNewsIfLoggedIn = function() {
        if ($scope.loggedIn) {
            $http.get('/api/news').then(function(response) {
                console.log(response);
                $scope.news = response.data.response.results;

                console.log($scope.news);
            }, function(err) {
                console.log('error to load news ' + JSON.stringify(err));
            });
        }
    };
/*
 add to likes and remove from likes
 heart symbol button (when click on gray heart.... it turns to red)

 addToUserLiked

 */
    function addToUserLiked(story) {
        console.log('addToUserLiked');
        if ($scope.loggedIn) {
            $http.post(
                '/api/news',
                story
            ).then(function(response) {
                console.log(response);
            }, function(err) {
                console.log('error addToUserLiked ' + JSON.stringify(err));
            });

        } else {
            console.log('User not logged in');
        }
    }

    function removeFromUserLiked(story) {
        console.log('removeFromUserLiked');
        console.log(story.id);
        if ($scope.loggedIn) {
            // $http.delete(
            //     '/api/news', { id: story.id }
            // ).then(function(response) {
            //     console.log(response);
            // }, function(err) {
            //     console.log('error removeFromUserLiked ' + JSON.stringify(err));
            // });
            $http({
                    url: '/api/news',
                    method: 'DELETE',
                    data: {
                        id: story.id
                    },
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    }
                })
                .then(function(response) {
                    console.log(response);
                }, function(err) {
                    console.log('error removeFromUserLiked ' + JSON.stringify(err));
                });
        } else {
            console.log('User not logged in');
        }
    }
/*
 when you click on already liked post ... then upper function will be called.
 in that case red heart turns grey (removes from likes)

 */
    $scope.likeSwitch = function(index) {
        var likedItem = $scope.news[index];
        $scope.news[index].like = !$scope.news[index].like;
        if ($scope.news[index].like) {
            console.log('user has clicked like');
            addToUserLiked($scope.news[index]);
        } else {
            console.log('user has clicked unlike');
            removeFromUserLiked($scope.news[index]);
        }
    };
    $scope.loadNewsIfLoggedIn();
});