/**
*	Controller for booking.cancel module
*
*	@author Lakha Singh
*/
define([
	'./module',
	'services'
], function( module ){
	module.controller('cancel.cancelCtrl', [
		'$scope',
		'core.Bookings',
		'core.Interface',
		'core.Common',
		'core.Utils',
		function( $scope, Bookings, Interface, Common, Utils ){
			Utils.log( "booking.cancel.cancelCtrl" );

			// Template for this controller
			$scope.view = 'modules/booking/cancel/cancel.html';

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