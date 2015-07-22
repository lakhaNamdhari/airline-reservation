/**
*	It fetches bookings data from server
*
*	@author Lakha Singh
*/
define([
	'core/module',
	'angular-resource',
	'services'
], function( module ){
	module.factory( "core.Bookings", [
		'$resource',
		'core.Utils',
		function ( $resource, Utils ){
			Utils.log( "core.services.Bookings" );

			return $resource("book_flight/v1/reservations/:bookingId");
		}
	]);
});
