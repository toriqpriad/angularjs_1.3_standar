var apps = angular.module('app', [
  'app.controllers', 'app.factories', 'app.services', 'app.constants', 'app.directives',
  'ui.router', 'ngAnimate', 'toastr', 'ui.bootstrap', 'angular-md5', 'ngStorage', 'angular-jwt'
])

var controllers = angular.module('app.controllers', []);
var directives = angular.module('app.directives', []);
var factories = angular.module('app.factories', []);
var services = angular.module('app.services', []);
