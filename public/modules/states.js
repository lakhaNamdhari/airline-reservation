/**
*	Configure routes for Application
*
*	@author Lakha Singh
*/
define([
	'./app'
], function( app ){
	app.config( [
		'$stateProvider',
		'$urlRouterProvider',
		function ( $stateProvider, $urlRouterProvider ){
			// used for redirection
			$urlRouterProvider.when("/", "/booking");
			$urlRouterProvider.when("/manage/airports", "/manage");
			$urlRouterProvider.otherwise("/");

			$stateProvider
				.state( "booking", { 
					url: "/booking",
					templateUrl: "modules/booking/booking.html"
				})
				.state( "booking.search", {
					url: "/:origin/:destination", 
					templateUrl: "modules/booking/booking-new.html"
				})
				.state( "manage", {
					url: "/manage", 
					templateUrl: "modules/manage/manage-airports.html"
				})
				.state( "manage.flights", {
					url: "/flights", 
					templateUrl: "modules/manage/manage-flights.html"
				})
		}
	]);
});