(function() {
    'use strict';

    angular
        .module('propertyManager')
        .controller('propertyController', propertyController);

    propertyController.$inject = ['userFactory', 'propertyFactory', 'toastr', '$state', 'localStorageService'];

    /* @ngInject */
    function propertyController(userFactory, propertyFactory, toastr, $state, localStorageService) {
        var vm = this;
        vm.title = 'propertyController';

        // vm.landlordProperties = localStorageService.get("localProperties")

        ////////////////

        vm.addProperty = function() {
            vm.propertyObject = {
                userId: localStorageService.get('localUserId'),
                propertyName: vm.newName,
                address: vm.newAddress,
                city: vm.newCity,
                state: vm.newState,
                zip: vm.newZip,
                contactPhone: vm.newPhone,
                rent: vm.newRent,
                sqrFt: vm.newSqrFt,
                leaseTerm: vm.newLeaseTerm,
                bedroomCount: vm.newBedroomCount,
                bathroomCount: vm.newBathroomCount,
                propertyImage: vm.newImage,
                petFriendly: vm.newPetFriendly
            }


            propertyFactory.createProperty(vm.propertyObject).then(
                function(response) {
                    console.log(vm.propertyObject)
                    vm.detailResponse = response.data;
                    console.log(vm.detailResponse);
                    vm.refresh()
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
        }
        vm.deleteProperty = function(propertyId) {


            propertyFactory.deleteProperty(propertyId).then(
                function(response) {

                    vm.refresh()
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
        }
        vm.refresh = function() {
            vm.inputUserName = localStorageService.get("localUserName")

            userFactory.getUser(vm.inputUserName).then(function(response) {

                vm.landlordProperties = response.data[0].properties

            })
        }
        vm.refresh();
    }
})();
