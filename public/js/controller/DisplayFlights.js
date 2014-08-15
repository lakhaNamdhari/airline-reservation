/**
*	Controller for DisplayFlights component.
*	This component displays flights.
*
*	@author Lakha Singh
*/
(function( ns ){
	// Name of this controller
	var ctrlName = "DisplayFlights";

	// Logs
	var log = ns.util && ns.util.log || function(){};
	
	// Application module
	var app = angular.module( "appControllers" );

	// register Controller
	app.controller( ctrlName, function ( $scope ){
		log( "controller." + ctrlName );

		// View Template for this controller
		$scope.view = 'partials/display-flights.html';
	});
}( window.NS = window.NS || {} ));

