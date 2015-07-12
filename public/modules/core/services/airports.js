/**
*	It fetches Airports data from server
*
*	@author Lakha Singh
*/
define([
	'core/module',
	'angular-resource',
	'./utils'
], function( module ){
	module.factory( "core.Airports", [
		'$resource',
		'core.Utils',
		function ( $resource, Utils ){
			Utils.log( "core.services.Airports" );

			return $resource("book_flight/v1/airports/:airportCode");
		}
	]);
});
