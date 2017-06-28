angular.module('FavoritesCtrl', []).controller('FavoritesController', function($scope, $cookies, $state, $http) {
    $scope.cookie = $cookies.get('sessionId');
    $scope.loggedIn = $scope.cookie ? true : false;
    if (!$scope.loggedIn) {
        $state.go('home');
    }
    $scope.tagline = 'These are my favorites!';
    $scope.loadFavoriteNewsIfLoggedIn = function() {
        if ($scope.loggedIn) {
            $http.get('/api/news/favorites').then(function(response) {
                console.log(response);
                $scope.news = response.data;

                console.log($scope.news);
            }, function(err) {
                console.log('error to load news ' + JSON.stringify(err));
            });
        }
    };
    $scope.loadFavoriteNewsIfLoggedIn();


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

    $scope.likeSwitch = function(index) {
        var likedItem = $scope.news[index].content;
        $scope.news[index].content.like = !$scope.news[index].content.like;
        if ($scope.news[index].content.like) {
            console.log('user has clicked like');
            addToUserLiked($scope.news[index].content);
        } else {
            console.log('user has clicked unlike');
            removeFromUserLiked($scope.news[index].content);
        }
    };

});