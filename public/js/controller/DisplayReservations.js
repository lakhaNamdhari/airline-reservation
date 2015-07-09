
/**
*	Controller for DisplayReservations component.
*	This component displays Reservations.
*
*	Exposes flights Data via NS.data.searchFlights.flights
*
*	@author Lakha Singh
*/
(function(){
	// Name of this component
	var ctrlName = "DisplayReservations";
	
	// Application module
	var app = angular.module( "appControllers" );
	
	app.controller( ctrlName, [
		'$scope',
		'$rootScope',
		'Reservations',
		'Interface',
		'Core',
		'Util',
		function( $scope, $rootScope,  Reservations, Interface, Core, Util ){
			Util.log( "appControllers." + ctrlName );

			// Template for this controller
			$scope.view = 'partials/display-reservations.html';

			// Shared data - for inter controller comm
			Interface.reservations = Interface.reservations || Reservations.query();
			
			// Reservation data
			$scope.reservations = Interface.reservations;

			// Core functions
			$scope.core = Core;

			// Cancels flight
			$scope.cancelFlight = function( flight ){		
				Reservations.remove( { bookingId: flight.number }, function(){
					var i;

					for ( i = 0; i < $scope.reservations.length; i++ ){
						if (  $scope.reservations[ i ][ "number" ] === flight.number ){
							$scope.reservations.splice( i, 1 );
							break;
						}
					}
				});
			};
		}
	]);
}());