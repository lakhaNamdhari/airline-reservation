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
	booking.factory( "core.Flights", [
		'$resource',
		'core.Utils',
		function ( $resource, Utils ){
			Utils.log( "core.services.Flights" );

			return $resource("book_flight/v1/flights/:number");
		}
	]);
});
