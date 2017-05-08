controllers.controller('FrontNavController', function($scope, $state) {
  $scope.title = 'Production';
  // returns true if the current router url matches the passed in url
  // so views can set 'active' on links easily
  $scope.isUrl = function(url) {
    if (url === '#')
      return false;
    return ('#' + $state.$current.url.source + '/').indexOf(url + '/') === 0;
  };

  $scope.pages = [{
    name: 'Home',
    url: '#/front/home'
  }, {
    name: 'Tentang Kami',
    url: '#/front/about'
  }, {
    name: 'Contact',
    url: '#/contact'
  }, {
    name: 'Dropdown Example',
    url: '#',
    subPages: [{
      name: 'About',
      url: '#/about'
    }, {
      name: 'Header'
    }, {
      name: 'Contact',
      url: '#/contact'
    }]
  }]
});
