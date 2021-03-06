'use strict';

/**
 * @ngdoc function
 * @name estudiantesApp.controller:VerEstudiantesCtrl
 * @description
 * # VerEstudiantesCtrl
 * Controller of the estudiantesApp
 */
angular.module('estudiantesApp')
  .controller('VerEstudiantesCtrl', function($scope, estudianteRequest) {
    var ctrl = this;
    ctrl.vista_previa = false;
    ctrl.estudiante_actual = null;
    ctrl.gridOptions = {
      enableFiltering: true,
      enableSorting: true,
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      columnDefs: [{
          field: 'Id',
          visible: false
        },
        {
          field: 'Documento'
        },
        {
          field: 'Nombre'
        },
        {
          field: 'Apellido'
        },
      ]
    };
    ctrl.gridOptions.multiSelect = false;
    estudianteRequest.get('estudiante', 'limit=0').then(function(response) {
      ctrl.gridOptions.data = response.data;
      console.log(ctrl.gridOptions.data);
    });
    ctrl.gridOptions.onRegisterApi = function(gridApi) {
      ctrl.gridApi = gridApi;

      gridApi.selection.on.rowSelectionChanged($scope, function(row) {
        ctrl.estudiante_actual = row.entity;
        if (ctrl.estudiante_actual !== null) {
          ctrl.vista_previa = true;
        }
      });
    };
    ctrl.limpiar_seleccion = function() {
      ctrl.vista_previa = null;
    };
  });
