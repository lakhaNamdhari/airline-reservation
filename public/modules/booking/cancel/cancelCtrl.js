/**
*	Controller for booking.cancel module
*
*	@author Lakha Singh
*/
define([
	'booking.cancel',
	'booking.bookings',
	'services'
], function( cancel ){
	cancel.controller('Ctrl', [
		'$scope',
		'booking.Bookings',
		'core.Interface',
		'core.Common',
		'core.Utils',
		function( $scope, Bookings, Interface, Common, Utils ){
			Utils.log( "booking.cancel.cancelCtrl" );

			// Template for this controller
			$scope.view = './cancel.tpl.html';

			// Shared data - for inter controller comm
			$scope.bookings = Interface.bookings = Interface.bookings || Bookings.query();

			// Common methods
			$scope.common = Common;

			// Cancels flight
			$scope.cancelFlight = function( flight ){		
				Bookings.remove( { bookingId: flight.number }, function(){
					var i;

					for ( i = 0; i < $scope.bookings.length; i++ ){
						if (  $scope.bookings[ i ][ "number" ] === flight.number ){
							$scope.bookings.splice( i, 1 );
							break;
						}
					}
				});
			};
		}
	]);
});