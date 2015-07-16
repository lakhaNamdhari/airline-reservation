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

			// keeps the list of airports
			$scope.airports = Interface.airports = Interface.airports || Airports.query();

			// Add new airport
			$scope.addAirport = function( airport ){
				if ( airport && airport.code && airport.city ){
					Airports.save( airport, function(){
						Interface.airports.push( airport );
					});
				}
			};
		}
	]);
});