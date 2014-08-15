
/**
*	Controller for DisplayReservations component.
*	This component displays Reservations.
*
*	Exposes flights Data via NS.data.searchFlights.flights
*
*	@author Lakha Singh
*/
(function( ns ){
	// Name of this component
	var ctrlName = "DisplayReservations";

	// Logs
	var log = ns.util && ns.util.log || function(){};
	
	// Application module
	var app = angular.module( "appControllers" );
	
	app.controller( ctrlName, function( $scope, Reservations ){
		log( "controller." + ctrlName );

		// View Template for this controller
		$scope.view = 'partials/display-reservations.html';

		// Contains all Reservation data
		$scope.reservations = Reservations.query();
	});
}( window.NS = window.NS || {} ));