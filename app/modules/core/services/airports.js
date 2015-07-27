/**
*	It fetches Airports data from server
*
*	@author Lakha Singh
*/
define([
	'core/module',
	'angular-resource'
], function( module ){
	module.factory( "core.Airports", [
		'$resource',
		'$log',
		function ( $resource, $log ){
			$log.debug( "core.services.Airports  YYY" );

			return $resource("book_flight/v1/airports/:airportCode");
		}
	]);
});
