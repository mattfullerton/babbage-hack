demo.directive('treemapBreadcrumpOld', ['$rootScope', function($rootScope) {
  return {
    restrict: 'EA',
    require: '^babbage',
    scope: {
      state: '=',
      reset: '='
    },
    template: '<div><ul ng-repeat="tile in tiles"><li>{{valueForTile(tile)}}</li></ul><a href="" ng-click="breadcrumpUp();">Ebene hoch</a></div>',
    link: function(scope, element, attrs, babbageCtrl) {
      var cleanCuts = function(cuts) {
        var cutLength = cuts.length;
        var newCuts = {};
        for(var i=0;i<cutLength;i++) {
          var cut = cuts[i];
          var cutElements = cut.split(":");
          newCuts[cutElements[0]] = cutElements[1];
        }
        return newCuts;
      }
      scope.tiles = [scope.state.tile[0]];
      var breadcrump = [];
      scope.cuts = cleanCuts(scope.state.cut);
      scope.breadcrumpUp = function() {
        if(scope.tiles.length > 1) {
          var currentTile = scope.tiles.pop();
          var currentCuts = scope.state.cut;
          scope.state.tile = [scope.tiles[scope.tiles.length-1]];
          var newCuts = [];
          for(var j=0;j<currentCuts.length;j++) {
            if(currentCuts[j].indexOf(scope.state.tile) == -1){
              newCuts.push(currentCuts[j]);
            }
          }
          scope.state.cut = newCuts;
        }
      }
      scope.valueForTile = function(tile) {
        return scope.cuts[tile] || tile;
      }
      var resetTiles = function() {
        scope.tiles = [];
      }
      scope.$watch('reset', function(reset) {
        if(reset) { resetTiles();scope.reset = false; }
      });
      scope.$watch('state', function(newValue, oldValue) {
        if(oldValue !== newValue) {
          var newTile = newValue.tile[0];
          var newCuts = newValue.cut;
          scope.cuts = cleanCuts(newCuts);
          var tilesLength = scope.tiles.length;
          var contains = false;
          for(var i=0;i<=tilesLength;i++) {
            if(newTile == scope.tiles[i]){
              contains = true;
            }
          }
          if(!contains) {
            scope.tiles.push(newTile);
          }
        };
      }, true);
    }
  }
}]);
