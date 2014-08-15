/**
*	Controller for SearchFlights component.
*	This component searches flights based on origin and destination.
*
*	@author Lakha Singh
*/
(function( ns ){
	// Name of this component
	var ctrlName = "SearchFlights";

	// Logs
	var log = ns.util && ns.util.log || function(){};

	// Application module
	var app = angular.module( "appControllers" );
	
	// register Controller
	app.controller( ctrlName, function ( $scope, $rootScope, Airports, Flights ){
		log( "controller." + ctrlName );
		
		// View Template for this controller
		$scope.view = 'partials/search-flights.html';

		// Fetch airports data
		$scope.airports = Airports.query();

		// Flag to show / hide the suggestion list
		$scope.show = {
			origin: true,
			destination: true
		};

		// flights query data - origin and destination
		$scope.flightQuery = {};

		/**
		*	To Choose city from popup menu
		*
		*	@method reserveFlight
		*/
		$scope.selectPlace = function( field, airportCode ){
			$scope.flightQuery[ field ] = airportCode;

			// Hide the suggestion List
			$scope.show[ field ] = false;
		};
		
		/**
		*	To Search Flights
		*
		*	@method reserveFlight
		*/
		$scope.searchFlights = function( query ){			
			$rootScope.flights = Flights.query( query );
		};
	});
}( window.NS = window.NS || {} ));