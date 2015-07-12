/**
*	Controller for booking.cancel module
*
*	@author Lakha Singh
*/
define([
	'./module',
	'booking.bookings',
	'booking.flights',
	'services'
], function( module ){
	module.controller('new.newCtrl', [
		'$scope',
		'booking.Bookings',
		'booking.Flights',
		'core.Interface',
		'core.Common',
		'core.Utils',
		function( $scope, Bookings, Flights, Interface, Common, Utils ){
			Utils.log( "booking.new.newCtrl" );

			// Template for this controller
			$scope.view = 'modules/booking/new/new.html';

			// Common methods
			$scope.common = Common;

			// for comm b/w book.new and book.cancel module
			$scope.bookings = Interface.bookings = Interface.bookings || Bookings.query();

			// reads search query through this interface
			$scope.searchQuery = Interface.search = Interface.search || {}; 

			// when search query changes fetch new flights
			$scope.$watch('searchQuery', function(){
				if ( $scope.searchQuery.origin && $scope.searchQuery.destination ){
					$scope.flights = Flights.query(  $scope.searchQuery );
				}
			}, true);

			// Books new Flight
			$scope.reserveFlight = function( flight ){
				Bookings.save( flight, function(){
					Interface.bookings.push( flight );
				});
			};
		}
	]);
});