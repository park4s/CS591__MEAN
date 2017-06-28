
/**
 * app.js has starting for angular code
 */

var app = angular.module('jimmiNews', ['ui.router', 'ngCookies', 'MainCtrl', 'FavoritesCtrl', 'FavoritesService']);

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
            .state('favorite', {
                url: '/favorites',
                templateUrl: 'views/favorite.html',
                controller: 'FavoritesController'
            });

        $urlRouterProvider.otherwise('home');
    }
]);

// app.config(['$httpProvider', function($httpProvider) {
//     $httpProvider.interceptors.push(function($q) {
//         return {
//             'request': function(config) {
//                 console.log('REquest Interceptor');
//                 return config;
//             },

//             'response': function(response) {
//                 // same as above
//                 console.log('Response Received');
//                 console.log(response);
//                 return response;
//             },

//             'responseError': function(rejection) {
//                 console.log('Response Error Received');
//                 console.log(rejection);
//                 return $q.reject(rejection);
//             }
//         };
//     });
// }]);