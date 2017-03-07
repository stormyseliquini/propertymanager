(function() {
    'use strict';

    angular
        .module('propertyManager')
        .controller('userController', userController);

    userController.$inject = ['userFactory', 'toastr', '$state', 'localStorageService'];

    /* @ngInject */
    function userController(userFactory, toastr, $state, localStorageService) {
        var vm = this;
        vm.title = 'userController';


        ////////////////
        vm.entryCheck = function() {
            if (vm.firstName != null && vm.lastName != null && vm.createEmail != null && vm.createUserName != null) {
                vm.newUser();
            } else {
                vm.invalidUserName = 'Please fill out all forms'
            }

        }
        vm.newUser = function() {


            userFactory.getUser(vm.createUserName).then(function(response) {
                if (response.data == '') {
                    vm.createNewUser();
                    vm.firstName = ''
                    vm.lastName = ''
                    vm.createEmail = ''
                    vm.createUserName = ''
                    vm.isPropertyManager = false
                    vm.invalidUserName = 'Account created successfully!'

                } else {
                    console.log('already exists')
                    console.log(response.data)
                    vm.firstName = ''
                    vm.lastName = ''
                    vm.createEmail = ''
                    vm.createUserName = ''
                    vm.isPropertyManager = false
                    vm.invalidUserName = 'The username you entered already exists, please try another'
                }
            })
        }
        vm.createNewUser = function() {
            var userObject = {
                firstName: vm.firstName,
                lastName: vm.lastName,
                email: vm.createEmail,
                userName: vm.createUserName,
                isPropertyManager: vm.isPropertyManager
            }
            userFactory.createUser(userObject).then(function(response) {

                    console.log(response);
                    toastr.success('account created!');

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

        vm.login = function() {
            var inputUserName = vm.userName
            userFactory.getUser(inputUserName).then(function(response) {
                    vm.userResponse = response.data[0]
                    localStorageService.set("localUserId", vm.userResponse.userId)
                    localStorageService.set("localProperties", vm.userResponse.properties)
                    localStorageService.set("localUserName", vm.userResponse.userName)
                    if (vm.userResponse.isPropertyManager == false) {

                        vm.hideLogin = true;


                    } else {
                        $state.go('landlord');
                    }

                    console.log(vm.userResponse)




                    // console.log(response);
                    toastr.success('account created!');
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
    }
})();
