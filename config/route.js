apps.config(function($stateProvider, $urlRouterProvider, $controllerProvider) {
  var origController = apps.controller
  apps.controller = function(name, constructor) {
    $controllerProvider.register(name, constructor);
    return origController.apply(this, arguments);
  }
  var viewsPrefix = 'views/';
  // For any unmatched url, send to /
  $stateProvider
    .state('front', {
      url: '/front',
      templateUrl: viewsPrefix + "front.html",
      controller: 'FrontNavController'
    })

    .state('front.home', {
      url: '/home',
      templateUrl: viewsPrefix + "home.html"
    })

    .state('front.about', {
      url: '/about',
      templateUrl: viewsPrefix + "about.html"
    })

    .state('front.loginadmin', {
      url: '/login-admin',
      templateUrl: viewsPrefix + "login-admin.html",
      controller: 'AdminController'

    })

    .state('admin', {
      url: '/admin',
      abstract: true,
      templateUrl: viewsPrefix + "/admin/nav-admin.html",
      controller: 'AdminNavController'
    })

    .state('admin.dashboard', {
      url: '/dashboard',
      templateUrl: viewsPrefix + "/admin/dashboard.html",
      controller: 'AdminController',
    })

    .state('admin.material', {
      url: '/material',
      templateUrl: viewsPrefix + "/admin/material.html",
      controller: 'AdminMaterialController',
    })

    .state('admin.demand', {
      url: '/demand',
      templateUrl: viewsPrefix + "/admin/demand.html",
      controller: 'AdminDemandController',
    })
    .state('admin.edit_data', {
      url: '/edit/:contentEditSeq',
      templateUrl: viewsPrefix + "/admin/display-content.html",
      controller: 'AdminController',
    })



    .state('admin.view_data', {
      url: '/view/:contentViewSeq',
      templateUrl: viewsPrefix + "/admin/display-content.html",
      controller: 'AdminController',
    })

  $urlRouterProvider.otherwise("/front/home")
})
