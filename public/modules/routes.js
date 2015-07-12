/**
*	Configure routes for Application
*
*	@author Lakha Singh
*/
define([
	'./app',
	'angular-route'
], function( app ){
	app.config( [
		'$routeProvider',
		function ( $routeProvider ){
			$routeProvider
				.when( "/", { templateUrl: "modules/main.html" } );
		}
	]);
});