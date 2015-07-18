/**
*	Controller for booking.cancel module
*
*	@author Lakha Singh
*/
define([
	'./module',
	'services'
], function( module ){
	module.controller('booking.newCtrl', [
		'$scope',
		'$stateParams',
		'core.Bookings',
		'core.Search',
		'core.Interface',
		'core.Common',
		'core.Utils',
		function( $scope, $stateParams, Bookings, Search, Interface, Common, Utils ){
			Utils.log( "booking.new.newCtrl" );

			// Template for this controller
			$scope.view = 'modules/booking/new/new.html';

			// Common methods
			$scope.common = Common;

			// for comm b/w book.new and book.cancel module
			$scope.bookings = Interface.bookings = Interface.bookings || Bookings.query();

			// populate with flights data
			$scope.flights = Search.query({
				origin: $routeParams.origin,
				destination: $routeParams.destination
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