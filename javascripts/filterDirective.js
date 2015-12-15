demo.directive('filter', ['$rootScope', function($rootScope) {
  return {
    restrict: 'EA',
    require: '^babbage',
    scope: {
      filter: '@'
    },
    link: function(scope, element, attrs, babbageCtrl) {
      //$rootScope.state.cut = ['test'];
      babbageCtrl.setState(scope.state);
    }
  }
}]);
