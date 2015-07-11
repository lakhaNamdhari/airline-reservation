/**
*	Configure routes for Application
*
*	@author Lakha Singh
*/
define([
	'app',
	'angular-route'
], function( App ){
	App.config( [
		'$routeProvider',
		function ( $routeProvider ){
			$routeProvider
				.when( "/", { templateUrl: "modules/main.tpl.html" } );
		}
	]);
});