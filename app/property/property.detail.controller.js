(function() {
    'use strict';

    angular
        .module('propertyManager')
        .controller('propertyDetailController', propertyDetailController);

    propertyDetailController.$inject = ['propertyFactory', '$stateParams', 'toastr'];

    /* @ngInject */

    function propertyDetailController(propertyFactory, $stateParams, toastr) {
        var vm = this;
        vm.title = 'propertyDetailController';



        function getDetails() {
            propertyFactory.searchDetails($stateParams.propertyId).then(
                function(response) {
                    vm.detailResponse = response.data;
                    console.log(vm.detailResponse);

                    toastr.success('we have movies');
                },
                function(error) {
                    if (error.data) {
                        toastr.error("there was a problem: " + error.data);
                    } else {
                        toastr.info('no data found.');
                    }
                }

            )
        };
        getDetails();

    }

})();
