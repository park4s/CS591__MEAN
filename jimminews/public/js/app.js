/**
 * This is the main angular app file. project starts from here
 */
var app = angular.module('jimmiNews', ['ui.router', 'MainCtrl', 'WeatherCtrl', 'FavoritesCtrl', 'AuthenticationService']);

// States for the project, i.e. all the possible URLs
app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        console.log('We were here');
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: 'MainController'
            })
            .state('weather', {
                url: '/weather',
                templateUrl: 'views/weather.html',
                controller: 'WeatherController'
            })
            .state('favorite', {
                url: '/favorites',
                templateUrl: 'views/favorite.html',
                controller: 'FavoritesController'
            });

        $urlRouterProvider.otherwise('home');
    }
]);