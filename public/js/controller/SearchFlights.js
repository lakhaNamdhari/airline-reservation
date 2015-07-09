/**
*	Controller for SearchFlights component.
*	This component searches flights based on origin and destination.
*
*	@author Lakha Singh
*/
(function(){
	// Name of this component
	var ctrlName = "SearchFlights";
	
	// Application module
	var app = angular.module( "appControllers" );
	
	// register Controller
	app.controller( ctrlName, [
		'$scope',
		'$rootScope',
		'Airports', 
		'Flights',
		'Reservations',
		'Interface',
		'Core',
		'Util',
		function ( $scope, $rootScope, Airports, Flights, Reservations, Interface, Core, Util ){
			Util.log( "appControllers." + ctrlName );
			
			// Template for this controller
			$scope.view = 'partials/search-flights.html';

			// Airport data
			$scope.airports = Airports.query();

			// Core Functions
			$scope.core = Core;

			// Shared data - for inter controller comm
			Interface.reservations = Interface.reservations || Reservations.query();

			// Toggle suggestion list
			$scope.show = {
				origin: true,
				destination: true
			};

			// flights query
			$scope.flightQuery = {};

			// Updates input box with selected value from popup
			$scope.selectPlace = function( field, airportCode ){
				$scope.flightQuery[ field ] = airportCode;

				// Hide the suggestion List
				$scope.show[ field ] = false;
			};
			
			// Search's flights based on origin and destination code
			$scope.searchFlights = function( query ){			
				$scope.flights = Flights.query( query );
			};

			// Books new Flight
			$scope.reserveFlight = function( flight ){
				Reservations.save( flight, function(){
					//$rootScope.$broadcast( CEvents.newReservation, flight );
					Interface.reservations.push(flight);
				});
			};
		}
	]);
}());