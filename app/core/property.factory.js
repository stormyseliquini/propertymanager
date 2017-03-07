(function() {
    'use strict';

    angular
        .module('propertyManager')
        .factory('propertyFactory', propertyFactory);

    propertyFactory.$inject = ['$http', '$q', 'backendUrl'];

    /* @ngInject */
    function propertyFactory($http, $q, backendUrl) {
        var service = {
            searchProperties: searchProperties,
            searchDetails: searchDetails,
            createProperty: createProperty,
            deleteProperty: deleteProperty
        };
        return service;

        ////////////////
        // search for properties
        function createProperty(data) {
            //---------------------
            var defer = $q.defer();

            $http({
                method: 'POST',
                url: backendUrl + 'properties',
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

        function deleteProperty(propertyId) {
            var defer = $q.defer();

            $http({
                method: 'DELETE',
                url: backendUrl + 'properties/' + propertyId


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


        function searchProperties(urlString) {

            //---------------------
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: backendUrl + "Properties/Filter?" + urlString,

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


        function searchDetails(id) {

            //---------------------
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: backendUrl + "properties/" + id,

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
