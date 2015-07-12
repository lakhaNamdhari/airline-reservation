/**
*	Configure routes for Application
*
*	@author Lakha Singh
*/
define([
	'./app'
], function( app ){
	app.config( [
		'$routeProvider',
		function ( $routeProvider ){
			$routeProvider
			.when( "/flights/:origin/:destination", { 
				templateUrl: "modules/booking/new/new.html",
				controller: "new.newCtrl"
			})
		}
	]);
});