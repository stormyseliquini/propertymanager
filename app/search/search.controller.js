(function() {
    'use strict';

    angular
        .module('propertyManager')
        .controller('searchController', searchController);

    searchController.$inject = ['propertyFactory', 'toastr', 'localStorageService'];

    /* @ngInject */
    function searchController(propertyFactory, toastr, localStorageService) {
        var vm = this;
        vm.title = 'searchController';


        ////////////////

        vm.searchProperties = function() {


            var urlString = "city=" + vm.city + "&zip=" + vm.zip + "&minRent=" + vm.minRent + "&maxRent=" + vm.maxRent + "&bedroomCount=" + vm.nOfBedrooms + "&bathroomCount=" + vm.nOfBathrooms;
            propertyFactory.searchProperties(urlString).then(
                function(response) {

                    vm.propertyResponse = response.data
                    console.log(vm.propertyResponse);
                    toastr.success('list received');
                    vm.city = ''
                    vm.zip = ''
                    vm.minRent = ''
                    vm.maxRent = ''
                    vm.nOfBedrooms = ''
                    vm.nOfBathrooms = ''
                },
                function(error) {
                    if (error.data) {
                        toastr.error('There was a problem: ' + error.data);
                    } else {
                        toastr.info('no data found')
                    }
                }
            )


        }
        vm.logOut = function() {
            $localStorageService.$reset();
            $state.go('search')
        }
    }
})();
