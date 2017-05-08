controllers.controller('AdminNavController', function ($scope, $state) {
  $scope.title = 'Production - Administrator';
  $scope.isUrl = function (url) {
    if (url === '#')
      return false;
    return ('#' + $state.$current.url.source + '/dashboard').indexOf(url + '/dashboard') === 0;
  };

  $scope.pages = [{
    name: 'Home',
    url: 'admin.dashboard'
  }, {
    name: 'Material',
    url: 'admin.material'
  }]
});
