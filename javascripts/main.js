var demo = angular.module('demo', ['ngRoute', 'ngBabbage', 'angular.filter', 'ui.bootstrap', 'ui.select']);

demo.controller('DemoCtrl', function ($scope) {
  $scope.einnahmenAusgaben = 'einnahmeausgabe.einnahmeausgabe:Einnahme';
  $scope.state = {
    //tile: ['einzelplanbezeichnung.einzelplanbezeichnung'],
    tile: ['hauptgruppe.hauptgruppenbezeichnung'],
    cut: [ 'einnahmeausgabe.einnahmeausgabe:Einnahme' ],
    hirachy: {
      'einzelplanbezeichnung.einzelplanbezeichnung': 'kapitel.kapitelbezeichnung',
      'kapitel.kapitelbezeichnung': 'zweckbestimmung.zweckbestimmung',
      'hauptgruppe.hauptgruppenbezeichnung': 'obergruppe.obergruppenbezeichnung',
      'obergruppe.obergruppenbezeichnung': 'gruppenbezeichnung.gruppenbezeichnung',
      'hauptfunktion.hauptfunktionbezeichnung': 'oberfunktion.oberfunktionbezeichnung',
      'oberfunktion.oberfunktionbezeichnung': 'funktionbezeichnung.funktionbezeichnung'
    }
  }
  $scope.einahmenausgaben = [{label: 'Einnahmen', id: 'einnahmeausgabe.einnahmeausgabe:Einnahme'},{label: 'Ausgaben', id: 'einnahmeausgabe.einnahmeausgabe:Ausgabe'}]
  $scope.changeEinahmenAusgaben = function(attr) {
    $scope.einnahmenAusgaben = attr.id;
    $scope.state.cut = [attr.id];
  }
  $scope.setTile = function(tile) {
    $scope.state.tile = [tile];
    $scope.state.cut = [ $scope.einnahmenAusgaben ];
  }
});
