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
], function( new ){
	new.controller('booking.newCtrl', [
		'$scope',
		'booking.Bookings',
		'core.Interface',
		'core.Common',
		'core.Utils',
		function( $scope, Bookings, Interface, Common, Utils ){
			Utils.log( "booking.new.newCtrl" );

			// Template for this controller
			$scope.view = './new.tpl.html';

			// for comm b/w book.new and book.cancel module
			$scope.bookings = Interface.bookings = Interface.bookings || Bookings.query();

			// for comm b/w search and book.new module
			$scope.flights = Interface.search = Interface.search || [];

			// Common methods
			$scope.common = Common;

			// Books new Flight
			$scope.reserveFlight = function( flight ){
				Bookings.save( flight, function(){
					Interface.bookings.push( flight );
				});
			};
		}
	]);
});