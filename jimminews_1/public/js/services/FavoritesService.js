angular.module('FavoritesService', []).factory('Favorites', ['$http', function($http) {

    return {
        // call to get all favorites
        get: function() {
            return $http.get('/api/favorites');
        },

        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new favorite
        create: function(favoriteData) {
            return $http.post('/api/favorites', favoriteData);
        },

        // call to DELETE a favorite
        delete: function(id) {
            return $http.delete('/api/favorites/' + id);
        }
    }

}]);