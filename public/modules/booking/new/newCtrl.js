/**
*	Controller for booking.cancel module
*
*	@author Lakha Singh
*/
define([
	'booking.new',
	'booking.bookings',
	'booking.flights',
	'services'
], function( new ){
	new.controller('booking.new', [
		'$scope',
		'booking.Bookings',
		'core.Interface',
		'core.Common',
		'core.Utils',
		function( $scope, Bookings, Interface, Common, Utils ){
			Utils.log( "booking.new.newCtrl" );

			// Template for this controller
			$scope.view = './new.tpl.html';

			// Shared data - for inter controller comm
			$scope.bookings = Interface.bookings = Interface.bookings || Bookings.query();

			// Common methods
			$scope.common = Common;

			// Search's flights based on origin and destination code
			$scope.searchFlights = function( query ){			
				$scope.flights = Flights.query( query );
			};

			// Books new Flight
			$scope.reserveFlight = function( flight ){
				Bookings.save( flight, function(){
					Interface.bookings.push( flight );
				});
			};
		}
	]);
});