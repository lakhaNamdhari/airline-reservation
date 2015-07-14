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
			.when( "/", { 
				templateUrl: "modules/booking/booking.html"
			})
			.when( "/booking", { 
				templateUrl: "modules/booking/booking.html"
			})
			.when( "/booking/:origin/:destination", { 
				templateUrl: "modules/booking/booking-new.html"
			})
			.when( "/manage", { 
				templateUrl: "modules/manage/manage-airports.html"
			})
			.when( "/manage/flights", { 
				templateUrl: "modules/manage/manage-flights.html"
			})
		}
	]);
});