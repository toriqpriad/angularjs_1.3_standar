apps.directive('updateTitle', ['$rootScope', '$timeout', function($rootScope, $timeout) {
  return {
    link: function(scope, element) {
      var listener = function(event, toState) {
        var title = 'Production';
        if (toState.data && toState.data.pageTitle)
          title = toState.data.pageTitle + ' - ' + title;
        $timeout(function() {
          element.text(title);
        }, 0, false);
      };

      $rootScope.$on('$stateChangeSuccess', listener);
    }
  };
}]);
