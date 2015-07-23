/**
*	Defines booking module
*
*	@author Lakha Singh
*/
define('booking/module',[
	'angular',
	'core/module'
], function( angular ){
	var module = angular.module('BookFlight.booking', [
		'BookFlight.core'
	]);

	return module;
});
/**
*	Controller for booking.cancel module
*
*	@author Lakha Singh
*/
define('booking/cancel/cancelCtrl',[
	'booking/module',
	'services'
], function( module ){
	module.controller('booking.cancelCtrl', [
		'$scope',
		'core.Bookings',
		'core.Interface',
		'core.Common',
		'core.Utils',
		function( $scope, Bookings, Interface, Common, Utils ){
			Utils.log( "booking.cancelCtrl" );

			// Template for this controller
			$scope.view = 'modules/booking/cancel/cancel.html';

			// Shared data - for inter controller comm
			$scope.bookings = Interface.bookings = Interface.bookings || Bookings.query();

			// Common methods
			$scope.common = Common;

			// Cancels flight
			$scope.cancelFlight = function( flight ){		
				Bookings.remove( { bookingId: flight.number }, function(){
					var i;

					for ( i = 0; i < $scope.bookings.length; i++ ){
						if (  $scope.bookings[ i ][ "number" ] === flight.number ){
							$scope.bookings.splice( i, 1 );
							break;
						}
					}
				});
			};
		}
	]);
});
/**
*	Controller for booking.cancel module
*
*	@author Lakha Singh
*/
define('booking/new/newCtrl',[
	'booking/module',
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
			Utils.log( "booking.newCtrl" );

			// Common methods
			$scope.common = Common;

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
/**
*	Controller for search module
*
*	@author Lakha Singh
*/
define('booking/search/searchCtrl',[
	'booking/module',
	'services'
], function( module ){
	module.controller('booking.searchCtrl', [
		'$scope',
		'core.Airports', 
		'core.Utils',
		'$location',
		function ( $scope, Airports, Utils, $location ){
			Utils.log( "booking.searchCtrl");
			
			// Template for this controller
			$scope.view = 'modules/booking/search/search.html';

			// Airport data
			$scope.airports = Airports.query();

			// Used to toggle suggestion list
			$scope.show  = {};

			// Captures serach-query
			$scope.search = {};

			var url = $location.path();

			// populate origin / destination fields, if applicable
			if ( url.indexOf('/booking/') > -1 ){
				url = url.replace('/booking/', '').split('/');
				$scope.search.origin = url[0] || '';
				$scope.search.destination = url[1] || '';
			}

			// If page loads with prepopulated field, disable suggestion list
			if ( $scope.search.origin && $scope.search.destination ){
				$scope.show.origin = $scope.show.destination = false;
			}else{
				$scope.show.origin = $scope.show.destination = true;
			}

			// Updates input box with selected value from popup
			$scope.selectPlace = function( field, airportCode ){
				$scope.search[ field ] = airportCode;

				// Hide the suggestion List
				$scope.show[ field ] = false;
			};
		}
	]);
});
/**
*	Entry point for the booking module
*
*	@author Lakha Singh
*/
define('booking/main',[
	'booking/module',
	'booking/cancel/cancelCtrl',
	'booking/new/newCtrl',
	'booking/search/searchCtrl'
], function(){});

