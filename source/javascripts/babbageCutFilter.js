demo.directive('babbageCutFilter', ['$rootScope', function($rootScope) {
  return {
    restrict: 'EA',
    transclude: true,
    replace: true,
    require: '^babbage',
    scope: {
      selected: '@',
      filter: '=',
      defaultCut: '='
    },
    templateUrl: function(tElement, tAttrs) {
      if(tAttrs.type) {
        if(tAttrs.type === 'dropdown') {
          return 'budget-templates/cut-filter-dropdown.html';
        }
        if(tAttrs.type === 'dropdown-sub') {
          return 'budget-templates/cut-filter-dropdown-sub.html';
        }
      } else {
        return 'budget-templates/cut-filter.html';
      }
    },
    link: function(scope, element, attrs, babbageCtrl, transclude) {
      transclude(scope, function(clone, scope) {
        element.append(clone);
      });
      var getParentTile = function(tile) {
        var state = babbageCtrl.getState();
        for(var name in state.hierarchies) {
          if(name == tile) {
            return name;
          }
          var h = state.hierarchies[name];
          for(var i in h.levels) {
            if(h.levels[i] == tile) {
              return name;
            }
          }
        }
      };
      var findCutPosition = function(attrId) {
        var cutLength = scope.defaultCut.length;
        for(var i=0;i<cutLength;i++) {
          var cut = scope.defaultCut[i].split(':');
          var attr = attrId.split(':');
          if(cut[0] == attr[0]) { return i; }
        }
        return -1;
      };
      var cutIsSet = function(cut) {
        return cut.search(/[:]/) !== -1;
      };
      var multipleCuts = function(cut) {
        return cut.search(/[|]/) !== -1;
      };
      var changeOrRemove = function(cut, pos) {
        if(cutIsSet(cut)) {
          scope.defaultCut[pos] = cut;
        }else {
          scope.defaultCut.splice(pos,1);
        }
      };
      var setMultipleCuts = function(cut) {
        var cuts = cut.split("|");
        for(var i=0;i<cuts.length;i++) {
          changeOrAddCut(cuts[i]);
        }
      };
      var changeOrAddCut = function(cut) {
        var pos = findCutPosition(cut);
        if(pos !== -1) {
          changeOrRemove(cut, pos);
        } else {
          if(cutIsSet(cut)) {
            scope.defaultCut.push(cut);
          }
        }
      };
      var setNewCut = function(attrId) {
        if(multipleCuts(attrId)) {
          setMultipleCuts(attrId);
        }else {
          changeOrAddCut(attrId);
        }
        return scope.defaultCut;
      };
      scope.update = function(attr) {
        var state = babbageCtrl.getState();
        state.cut = setNewCut(attr.id);
        state.tile = [getParentTile(state.tile[0])];
        scope.selected = attr.label;
        babbageCtrl.setState(state);
      };
    }
  };
}]);
