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
	app.controller( ctrlName, function ( $scope, $rootScope, Airports, Flights, Reservations, CEvents, Shared, Util ){
		 Util.log( "controller." + ctrlName );
		
		// View Template for this controller
		$scope.view = 'partials/search-flights.html';

		// Fetches airports data
		$scope.airports = Airports.query();

		$scope.shared = Shared;

		// Flag to show / hide the suggestion list
		$scope.show = {
			origin: true,
			destination: true
		};

		// flights query data - origin and destination
		$scope.flightQuery = {};

		/**
		*	Updates input box with selected value from popup
		*
		*	@method reserveFlight
		*/
		$scope.selectPlace = function( field, airportCode ){
			$scope.flightQuery[ field ] = airportCode;

			// Hide the suggestion List
			$scope.show[ field ] = false;
		};
		
		/**
		*	Search's flights based on origin and destination code
		*
		*	@method reserveFlight
		*/
		$scope.searchFlights = function( query ){			
			$scope.flights = Flights.query( query );
		};

		/**
		*	To Book a new flight
		*
		*	@method reserveFlight
		*/
		$scope.reserveFlight = function( flight ){
			Reservations.save( flight, function(){
				$rootScope.$broadcast( CEvents.newReservation, flight );
			});
		};
	});
}());