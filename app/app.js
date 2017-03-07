(function() {
    'use strict';

    var propertyManager = angular.module('propertyManager', ['toastr', 'ui.router', 'LocalStorageModule'])
        .value('backendUrl', 'http://localhost:53466/api/');

    propertyManager.config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/search");

        $stateProvider
            .state('search', {
                url: '/search',
                templateUrl: "app/search/search.html",
                controller: "searchController",
                controllerAs: "vm"

            })

        .state('register', {
                url: "/register",
                templateUrl: "app/user/register.html",
                controller: "userController",
                controllerAs: "vm"

            })
            .state('landlord', {
                url: "/landlord",
                templateUrl: "app/property/property.detail.html",
                controller: "propertyController",
                controllerAs: "vm"
            })
            .state('details', {
                url: "/property/details/:propertyId",
                templateUrl: "app/property/property.grid.html",
                controller: "propertyDetailController",
                controllerAs: "vm"
            });
    });
})();
