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
		'$ocLazyLoadProvider',
		function ( $stateProvider, $urlRouterProvider, $ocLazyLoadProvider ){

			var lazyLoad = function( module, path ){
				return ['$ocLazyLoad', function( $ocLazyLoad ){
					return $ocLazyLoad.load({
						name: module,
						files: [ path ]
					});
				}]
			};

			// used for redirection
			$urlRouterProvider.when("/", "/booking");
			$urlRouterProvider.when("/manage", "/manage/airports");
			$urlRouterProvider.otherwise("/");

			$stateProvider
				.state( "booking", { 
					url: "/booking",
					templateUrl: "modules/booking/booking.html"
					/*,
					resolve: {
						scripts: lazyLoad( 'BookFlight.booking', 'modules/booking/main.js' ) 
					}*/
				})
				.state( "booking.search", {
					url: "/:origin/:destination", 
					templateUrl: "modules/booking/new/new.html",
					controller: "booking.newCtrl"
				})
				.state( "manage", {
					url: "/manage", 
					templateUrl: "modules/manage/manage.html" /*,
					resolve: {
						scripts: lazyLoad( 'BookFlight.manage', 'modules/manage/main.js' )
					}*/
				})
				.state( "manage.airports", {
					url: "/airports", 
					templateUrl: "modules/manage/airports/airports.html"
				})
				.state( "manage.flights", {
					url: "/flights", 
					templateUrl: "modules/manage/flights/flights.html"
				})
		}
	]);
});