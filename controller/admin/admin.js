controllers.controller('AdminController', function (
  $scope, $localStorage, $state, $stateParams, $modal, $rootScope, md5,
  jwtHelper, DataFactory, TokenService, toastr) {
  var refreshData = function () {
    AdminFactory.GetDataContent().success(function (response) {
      if (response.response != "FAIL") {
        $scope.content = response.data;
        $rootScope.allContent = response.data;
      } else {
        toastr.warning(response.message);
      }
    })
  }

  //IF admin.dashboard state
  if ($state.current.name == 'admin.dashboard') {
    // refreshData();
  }

  // FOR login admin
  $scope.LoginAdmin = function () {
    var input = {
      username: $scope.logindata.username,
      password: md5.createHash($scope.logindata.password)
    };
    var input = JSON.stringify(input);
    DataFactory.Post(input, '?action=login').success(function (response) {
      if (response.status == "OK") {
        $localStorage.app_token = response.token;
        toastr.success(response.message);
        $state.go('admin.dashboard');
      } else {
        toastr.warning(response.message);
      }
    });
  };
});
