angular.module('mainCtrl', [])

.controller('mainController', function ($rootScope, $location, Auth) {

  var vm = this;

  // get info if a pserson is logged in
  vm.loggedIn = Auth.isLoggedIn();

  // check to see if a user is logged in on every request
  $rootScope.$on('$routeChangeStart', function () {
    vm.loggedIn = Auth.isLoggedIn();

    // get user information on route change
    if (vm.loggedIn) {
      Auth.getUser()
        .success(function (data) {
          vm.user = data;
        });
    }
  });

  // function to handle login form
  vm.doLogin = function () {
    vm.processing = true;

    // clear the error
    vm.error = '';

    // call the Auth.login() function
    Auth.login(vm.loginData.username, vm.loginData.password)
      .success(function (data) {
        vm.processing = false;
        console.log('login worked');
        console.log(data.success);
        // if a user successfully logs in, redirect to users pages
        if (data.success) {
          $location.path('/users');
        } else {
          vm.error = data.message;
        }
      });
  };

  // function to handle logging out
  vm.doLogout = function () {
    Auth.logout();
    // reset all user info
    vm.user = {};
    $location.path('/login');
  };
});