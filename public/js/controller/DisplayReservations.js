
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
	
	app.controller( ctrlName, function( $scope, $rootScope,  Reservations ){
		$scope.util.log( "controller." + ctrlName );

		// View Template for this controller
		$scope.view = 'partials/display-reservations.html';

		// Contains all Reservation data
		$scope.reservations = Reservations.query();

		// Listen for any new reservations
		$rootScope.$on( $scope.events.newReservation, function( e, reservation ){
			$scope.reservations.push( reservation );
		});

		/**
		*	To Cancel a Flight
		*
		*	@method reserveFlight
		*/
		$scope.cancelFlight = function( flight ){		
			Reservations.remove( { bookingId: flight.number }, function(){
				var i;

				for ( i = 0; i < $scope.reservations.length; i++ ){
					if (  $scope.reservations[ i ][ "number" ] === flight.number ){
						$scope.reservations.splice( i, 1 );

						$scope.$emit( $scope.events.cancelReservation, flight );
						break;
					}
				}
			});
		};
	});
}());