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
	'services',
	'providers'
], function( module ){
	module.controller('booking.cancelCtrl', [
		'$scope',
		'core.Bookings',
		'core.Interface',
		'core.AirportName',
		'$log',
		function( $scope, Bookings, Interface, AirportName, $log ){
			$log.debug( "booking.cancelCtrl" );

			// Template for this controller
			$scope.view = 'modules/booking/cancel/cancel.html';

			// Shared data - for inter controller comm
			$scope.bookings = Interface.bookings = Interface.bookings || Bookings.query();

			// Common methods
			$scope.AirportName = AirportName;

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
		'$log',
		'$location',
		function ( $scope, Airports, $log, $location ){
			$log.debug( "booking.searchCtrl");
			
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
*	Displays Flights status
*
*	@author Lakha Singh
*/

define('booking/flight_status/flightStatusCtrl',[
	'booking/module',
	'services',
	'providers'
], function( module ){
	module.controller('booking.flightStatus', [
		'$scope',
		'$log',
		'core.Flights',
		'core.AirportName',
		function( $scope, $log, Flights, AirportName ){
			$log.debug('booking.FlightStatus');

			var i, delay;

			$scope.flights = Flights.query(function(){
				// Mock flights status, as no service is available
				for ( i = 0; i < $scope.flights.length; i++ ){
					delay = Math.floor(Math.random() * 10) - 4;
					$scope.flights[i]['status'] = delay < 0 ? "Delayed" : "Fine";
					$scope.flights[i]['delay'] = delay < 0 ? (-1 * delay) : 0;
				}
			});

			$scope.view = "modules/booking/flight_status/flightStatus.html"
			$scope.AirportName = AirportName;
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
	'booking/search/searchCtrl',
	'booking/flight_status/flightStatusCtrl'
], function(){});

