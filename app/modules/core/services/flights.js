/**
*	It fetches flights data from server
*
*	@author Lakha Singh
*/
define([
	'core/module',
	'angular-resource',
	'services'
], function( core ){
	core.factory( "core.Flights", [
		'$resource',
		'core.Utils',
		function ( $resource, Utils ){
			Utils.log( "core.services.Flights" );

			return $resource("book_flight/v1/flights/:number");
		}
	]);
});
