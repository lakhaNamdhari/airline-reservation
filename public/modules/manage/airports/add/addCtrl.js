/**
*	Controller for airports.add module
*
*	@author Lakha Singh
*/
define([
	'./module',
	'services'
], function( module ){
	module.controller('airports.addCtrl', [
		'$scope',
		'core.Airports',
		'core.Interface',
		'core.Utils',
		function( $scope, Airports, Interface, Utils ){
			Utils.log( "manage.airports.addCtrl" );

			// Template for this controller
			$scope.view = 'modules/manage/airports/add/add.html';

			// Shared data - for inter controller comm
			$scope.airports = Interface.airports = Interface.airports || Airports.query();

			// Cancels flight
			$scope.addAirport = function( flight ){
				if ( airport && airport.code && airport.city ){
					Airports.save( airport, function(){
						Interface.airports.push( airport );
					});
				}
			};
		}
	]);
});