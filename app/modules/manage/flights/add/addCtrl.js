/**
*	Controller for airports.add module
*
*	@author Lakha Singh
*/
define([
	'manage/flights/module',
	'angular',
	'services'
], function( module, angular ){
	module.controller('flights.addCtrl', [
		'$scope',
		'core.Flights',
		'core.Interface',
		'$log',
		function( $scope, Flights, Interface, $log ){
			$log.debug( "manage.flights.addCtrl" );

			// Template for this controller
			$scope.view = 'modules/manage/flights/add/add.html';

			// keeps the list of flights
			$scope.flights = Interface.flights = Interface.flights || Flights.query();

			// Add new airport
			$scope.addFlight = function( flight ){
				if ( flight && flight.number && flight.origin && flight.destination ){
					Flights.save( flight, function(){
						Interface.flights.push( angular.copy(flight) );
						flight.number = '';
						flight.origin = '';
						flight.destination = '';
					});
				}
			};
		}
	]);
});