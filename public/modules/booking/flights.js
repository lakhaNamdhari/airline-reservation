/**
*	It fetches flights data from server
*
*	@author Lakha Singh
*/
define([
	'booking/module',
	'angular-resource',
	'services'
], function( booking ){
	booking.factory( "booking.Flights", [
		'$resource',
		'core.Utils',
		function ( $resource, Utils ){
			Utils.log( "booking.Flights" );

			return $resource("book_flight/v1/flights/:origin/:destination");
		}
	]);
});
