/**
*	It searches flights from server
*
*	@author Lakha Singh
*/
define([
	'core/module',
	'angular-resource',
	'services'
], function( module ){
	module.factory( "core.Search", [
		'$resource',
		'core.Utils',
		function ( $resource, Utils ){
			Utils.log( "core.services.Flights" );

			return $resource("book_flight/v1/search/:origin/:destination");
		}
	]);
});
