(function() {
    'use strict';

    angular
        .module('propertyManager')
        .factory('userFactory', userFactory);

    userFactory.$inject = ['$http', '$q', 'backendUrl'];

    /* @ngInject */
    function userFactory($http, $q, backendUrl) {
        var service = {
            createUser: createUser,
            getUser: getUser
        };
        return service;

        ////////////////

        function createUser(data) {
            //---------------------
            var defer = $q.defer();

            $http({
                method: 'POST',
                url: backendUrl + 'users',
                data: data

            }).then(function(response) {
                if (typeof response.data === 'object') {

                    defer.resolve(response);
                } else {

                    defer.reject('no data found :(');
                }

            }, function(error) {

                console.log(error);
                defer.reject(error);

            });

            return defer.promise;
        }

        function getUser(username) {
            //---------------------
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: backendUrl + 'users/userName',
                params: {
                    userName: username
                }


            }).then(function(response) {
                if (typeof response.data === 'object') {

                    defer.resolve(response);
                } else {

                    defer.reject('no data found :(');
                }

            }, function(error) {

                console.log(error);
                defer.reject(error);

            });

            return defer.promise;
        }
    }
})();
