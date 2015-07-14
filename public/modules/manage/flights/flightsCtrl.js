/**
*	Controller for manage.flights module
*
*	@author Lakha Singh
*/
define([
	'./module',
	'services'
], function( module ){
	module.controller('flights.flightsCtrl', [
		'$scope',
		'core.Utils',
		function ( $scope, Utils ){
			Utils.log( "manage.flights.flightsCtrl");
			
			// Template for this controller
			$scope.view = 'modules/manage/flights/flights.html';

		}
	]);
});