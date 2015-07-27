/**
*	It fetches flights data from server
*
*	@author Lakha Singh
*/
define([
	'core/module',
	'angular-resource'
], function( module ){
	module.factory( "core.Flights", [
		'$resource',
		'$log',
		function ( $resource, $log ){
			$log.debug( "core.services.Flights" );

			return $resource("book_flight/v1/flights/:number");
		}
	]);
});
