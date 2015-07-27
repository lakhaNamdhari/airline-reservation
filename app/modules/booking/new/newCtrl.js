/**
*	Controller for booking.cancel module
*
*	@author Lakha Singh
*/
define([
	'booking/module',
	'services',
	'providers'
], function( module ){
	module.controller('booking.newCtrl', [
		'$scope',
		'$stateParams',
		'core.Bookings',
		'core.Search',
		'core.Interface',
		'core.AirportName',
		'$log',
		function( $scope, $stateParams, Bookings, Search, Interface, AirportName, $log ){
			$log.debug( "booking.newCtrl" );

			// Common methods
			$scope.AirportName = AirportName;

			// for comm b/w book.new and book.cancel module
			$scope.bookings = Interface.bookings = Interface.bookings || Bookings.query();

			// populate with flights data
			$scope.flights = Search.query({
				origin: $stateParams.origin,
				destination: $stateParams.destination
			});

			// Books new Flight
			$scope.reserveFlight = function( flight ){
				Bookings.save( flight, function(){
					Interface.bookings.push( flight );
				});
			};
		}
	]);
});