/**
*	Configure routes for Application
*
*	@author Lakha Singh
*/
define([
	'./app',
], function( app ){
	app.config( [
		'$stateProvider',
		'$urlRouterProvider',
		'$ocLazyLoadProvider',
		function ( $stateProvider, $urlRouterProvider, $ocLazyLoadProvider ){
			
			// loads and injects modules
			var lazyLoad = function( module, path ){
				return [
					'$ocLazyLoad',
					'$q',
					function( $ocLazyLoad, $q ){
					var df = $q.defer();

					require([ path ], function(){
						$ocLazyLoad.inject( module );
						df.resolve({status: true});
					})
					return df.promise;
				}];
			}

			// used for redirection
			$urlRouterProvider.when("/", "/booking");
			$urlRouterProvider.when("/manage", "/manage/airports");
			$urlRouterProvider.otherwise("/");

			$stateProvider
				.state( "booking", { 
					url: "/booking",
					templateUrl: "modules/booking/booking.html",
					resolve: {
						booking: lazyLoad('BookFlight.booking', 'booking/main')
					}
				})
				.state( "booking.search", {
					url: "/:origin/:destination", 
					templateUrl: "modules/booking/new/new.html",
					controller: "booking.newCtrl"
				})
				.state( "manage", {
					url: "/manage", 
					templateUrl: "modules/manage/manage.html",
					resolve: {					
						manage: lazyLoad('BookFlight.manage', 'manage/main')
					}
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