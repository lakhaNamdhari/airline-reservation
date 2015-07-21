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
			
			// all modules in apps
			$ocLazyLoadProvider.config({
				modules: [
				{
					name: 'BookFlight.booking',
					files: ['modules/booking/main.js']
				},				
				{
					name: 'BookFlight.manage',
					files: ['modules/manage/main.js']
				},				
				{
					name: 'manage.airports',
					files: ['modules/manage/airports/main.js']
				},				
				{
					name: 'manage.flights',
					files: ['modules/manage/flights/main.js']
				},				
				{
					name: 'manage.navigation',
					files: ['modules/manage/navigation/main.js']
				},
				{
					name: 'airports.add',
					files: ['modules/manage/airports/add/main.js']
				},
				{
					name: 'airports.remove',
					files: ['modules/manage/airports/remove/main.js']
				},
				{
					name: 'flights.add',
					files: ['modules/manage/flights/add/main.js']
				},
				{
					name: 'flights.remove',
					files: ['modules/manage/flights/remove/main.js']
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
						dep: ['$ocLazyLoad', function( $ocLazyLoad ){
							return $ocLazyLoad.load('BookFlight.booking').then(function(){
								$ocLazyLoad.inject('BookFlight.booking')
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
					templateUrl: "modules/manage/manage.html"
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