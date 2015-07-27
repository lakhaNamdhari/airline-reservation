/**
*	Configure routes for Application
*
*	@author Lakha Singh
*/
define([
	'./app',
], function( app ){
	app.config( [
		'$provide',
		'$stateProvider',
		'$urlRouterProvider',
		'$logProvider',
		'core.AirportNameProvider',
		function ( $provide, $stateProvider, $urlRouterProvider, $logProvider, AirportNameProvider ){
			// Decorates oclazyload with built-in way to load require modules
			$provide.decorator('$ocLazyLoad', [
				'$delegate',
				'$q',
				'$log',
				function( $delegate, $q, $log ){
					$log.debug('config.ocLazyLoad');

					$delegate.require = function( module, path ){
						var df = $q.defer(),
							_this = this;

						require([ path ], function(){
							_this.inject( module );
							df.resolve({status: true});
						})
						return df.promise;
					}

					return $delegate;
				}
			]);
			// Disable debug messages for prod
			//$logProvider.debugEnabled(false);

			// Config AirportName
			AirportNameProvider.sync( true );

			// used for redirection
			$urlRouterProvider.when("/", "/booking");
			$urlRouterProvider.when("/manage", "/manage/airports");
			$urlRouterProvider.otherwise("/");

			$stateProvider
				.state( "booking", { 
					url: "/booking",
					templateUrl: "modules/booking/booking.html",
					resolve: {
						booking: ['$ocLazyLoad', function( $ocLazyLoad ){
							return $ocLazyLoad.require('BookFlight.booking', 'booking/main');
						}]
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
						manage: ['$ocLazyLoad', function( $ocLazyLoad ){
							return $ocLazyLoad.require('BookFlight.manage', 'manage/main');
						}]
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