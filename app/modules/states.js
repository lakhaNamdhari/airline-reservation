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
			
			// modules config for oclazyload
			$ocLazyLoadProvider.config({
				modules: [
					{
						name: 'BookFlight.booking',
						files: ['modules/booking/main.js']
					},				
					{
						name: 'BookFlight.manage',
						files: ['modules/manage/main.js']
					}
				]
			});

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
							return $ocLazyLoad.load('BookFlight.booking').then(function(){
								$ocLazyLoad.inject('BookFlight.booking');
							});
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
						manage: [
							'$ocLazyLoad',
							function( $ocLazyLoad ){
								return $ocLazyLoad.load('BookFlight.manage').then(function(){
									$ocLazyLoad.inject('BookFlight.manage');
								});
							}
						]
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