/**
*	Controller for airports.remove module
*
*	@author Lakha Singh
*/
define([
	'./module',
	'services'
], function( module ){
	module.controller('airports.removeCtrl', [
		'$scope',
		'core.Airports',
		'core.Interface',
		'core.Utils',
		function( $scope, Airports, Interface, Utils ){
			Utils.log( "manage.airports.remove.removeCtrl" );

			// Template for this controller
			$scope.view = 'modules/manage/airports/remove/remove.html';

			// keeps the list of airports
			$scope.airports = Interface.airports = Interface.airports || Airports.query();

			// Removes airport
			$scope.removeAirport = function( airport ){
				if ( airport && airport.code && airport.city ){
					Airports.remove( { 
						airportCode: airport.code
					}, function(){
						var i;

						for ( i = 0; i < $scope.airports.length; i++ ){
							if (  $scope.airports[ i ][ "code" ] === airport.code ){
								$scope.airports.splice( i, 1 );
								break;
							}
						}
					});
				}
			};
		}
	]);
});