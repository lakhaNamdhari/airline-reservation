/**
*	It searches flights from server
*
*	@author Lakha Singh
*/
define([
	'core/module',
	'angular-resource'
], function( module ){
	module.factory( "core.Search", [
		'$resource',
		'$log',
		function ( $resource, $log ){
			$log.debug( "core.services.Flights" );

			return $resource("book_flight/v1/search/:origin/:destination");
		}
	]);
});
