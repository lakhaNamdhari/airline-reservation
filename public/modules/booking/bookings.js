/**
*	It fetches bookings data from server
*
*	@author Lakha Singh
*/
define([
	'booking',
	'angular-resource',
	'utils'
], function( booking ){
	booking.factory( "booking.Bookings", [
		'$resource',
		'core.Utils',
		function ( $resource, Utils ){
			Utils.log( "booking.Bookings" );

			return $resource("book_flight/v1/reservations/:bookingId");
		}
	]);
});
