demo.directive('filter', ['$rootScope', function($rootScope) {
  return {
    restrict: 'EA',
    require: '^babbage',
    link: function(scope, element, attrs, babbageCtrl) {
      //$rootScope.state.cut = ['test'];
      babbageCtrl.setState(scope.state);
    }
  }
}]);
