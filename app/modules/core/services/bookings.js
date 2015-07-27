/**
*	It fetches bookings data from server
*
*	@author Lakha Singh
*/
define([
	'core/module',
	'angular-resource'
], function( module ){
	module.factory( "core.Bookings", [
		'$resource',
		'$log',
		function ( $resource, $log ){
			$log.debug( "core.services.Bookings" );

			return $resource("book_flight/v1/reservations/:bookingId");
		}
	]);
});
