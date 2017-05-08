services.service('TokenService', function($localStorage, $state, DataFactory, toastr) {
  var checkToken = function() {
    token = JSON.stringify($localStorage.app_token);
    if (token == null) {
      console.log("No token");
      $state.go('front.loginadmin');
      toastr.warning("Tidak diizinkan");
    } else {
      DataFactory.Post(token, '?action=authtoken').success(function(response) {
        if (response != "OK") {
          console.log(response.message);
          $state.go('front.loginadmin');
        }
      })
    }

  };
  checkToken();
});
