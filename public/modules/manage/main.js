/**
*	Defines booking module
*
*	@author Lakha Singh
*/
define('manage/airports/module',[
	'angular',
	'core/main'
], function( angular ){
	var module = angular.module('BookFlight.manage.airports', [
		'BookFlight.core'
	]);

	return module;
});
/**
*	Controller for airports.add module
*
*	@author Lakha Singh
*/
define('manage/airports/add/addCtrl',[
	'manage/airports/module',
	'angular',
	'services'
], function( module, angular ){
	module.controller('airports.addCtrl', [
		'$scope',
		'core.Airports',
		'core.Interface',
		'$log',
		function( $scope, Airports, Interface, $log ){
			$log.debug( "manage.airports.addCtrl" );

			// Template for this controller
			$scope.view = 'modules/manage/airports/add/add.html';

			// keeps the list of airports
			$scope.airports = Interface.airports = Interface.airports || Airports.query();

			// Add new airport
			$scope.addAirport = function( airport ){
				if ( airport && airport.code && airport.city ){
					Airports.save( airport, function(){
						Interface.airports.push( angular.copy(airport) );
						airport.code = '';
						airport.city = '';
					});
				}
			};
		}
	]);
});
/**
*	Controller for airports.remove module
*
*	@author Lakha Singh
*/
define('manage/airports/remove/removeCtrl',[
	'manage/airports/module',
	'services'
], function( module ){
	module.controller('airports.removeCtrl', [
		'$scope',
		'core.Airports',
		'core.Interface',
		'$log',
		function( $scope, Airports, Interface, $log ){
			$log.debug( "manage.airports.remove.removeCtrl" );

			// Template for this controller
			$scope.view = 'modules/manage/airports/remove/remove.html';

			// keeps the list of airports
			$scope.airports = Interface.airports = Interface.airports || Airports.query();

			// Removes airport
			$scope.removeAirport = function( airport ){
				if ( airport && airport.code && airport.city ){
					Airports.remove( { 
						airportCode: airport.code
					}, function(){
						var i;

						for ( i = 0; i < $scope.airports.length; i++ ){
							if (  $scope.airports[ i ][ "code" ] === airport.code ){
								$scope.airports.splice( i, 1 );
								break;
							}
						}
					});
				}
			};
		}
	]);
});

/**
*	Entry point for the manage.airports module
*
*	@author Lakha Singh
*/
define('manage/airports/main',[
	'manage/airports/module',
	'manage/airports/add/addCtrl',
	'manage/airports/remove/removeCtrl'
], function(){});
/**
*	Defines booking module
*
*	@author Lakha Singh
*/
define('manage/flights/module',[
	'angular',
	'core/main'
], function( angular ){
	var module = angular.module('BookFlight.manage.flights', [
		'BookFlight.core'
	]);

	return module;
});
/**
*	Controller for airports.add module
*
*	@author Lakha Singh
*/
define('manage/flights/add/addCtrl',[
	'manage/flights/module',
	'angular',
	'services'
], function( module, angular ){
	module.controller('flights.addCtrl', [
		'$scope',
		'core.Flights',
		'core.Interface',
		'$log',
		function( $scope, Flights, Interface, $log ){
			$log( "manage.flights.addCtrl" );

			// Template for this controller
			$scope.view = 'modules/manage/flights/add/add.html';

			// keeps the list of flights
			$scope.flights = Interface.flights = Interface.flights || Flights.query();

			// Add new airport
			$scope.addFlight = function( flight ){
				if ( flight && flight.number && flight.origin && flight.destination ){
					Flights.save( flight, function(){
						Interface.flights.push( angular.copy(flight) );
						flight.number = '';
						flight.origin = '';
						flight.destination = '';
					});
				}
			};
		}
	]);
});
/**
*	Controller for flights.remove module
*
*	@author Lakha Singh
*/
define('manage/flights/remove/removeCtrl',[
	'manage/flights/module',
	'services'
], function( module ){
	module.controller('flights.removeCtrl', [
		'$scope',
		'core.Flights',
		'core.Interface',
		'$log',
		function( $scope, Flights, Interface, $log ){
			$log.debug( "manage.flights.remove.removeCtrl" );

			// Template for this controller
			$scope.view = 'modules/manage/flights/remove/remove.html';

			// keeps the list of flights
			$scope.flights = Interface.flights = Interface.flights || Flights.query();

			// Removes flight
			$scope.removeFlight = function( flight ){
				if ( flight && flight.number && flight.origin && flight.destination ){
					Flights.remove( { 
						number: flight.number
					}, function(){
						var i;

						for ( i = 0; i < $scope.flights.length; i++ ){
							if (  $scope.flights[ i ][ "number" ] === flight.number ){
								$scope.flights.splice( i, 1 );
								break;
							}
						}
					});
				}
			};
		}
	]);
});
/**
*	Entry point for the manage.flights module
*
*	@author Lakha Singh
*/
define('manage/flights/main',[
	'manage/flights/module',
	'manage/flights/add/addCtrl',
	'manage/flights/remove/removeCtrl'
], function(){});
/**
*	Defines booking module
*
*	@author Lakha Singh
*/
define('manage/navigation/module',[
	'angular',
	'core/main'
], function( angular ){
	var module = angular.module('BookFlight.manage.navigation', [
		'BookFlight.core'
	]);

	return module;
});
/**
*	Controller for manage.navigation
*
*	@author Lakha Singh
*/
define('manage/navigation/navigationCtrl',[
	'./module',
	'services'
], function( module ){
	module.controller('manage.navigationCtrl', [
		'$scope',
		'$location',
		'$log',
		'core.Common',
		function ( $scope, $location, $log, Common ){
			$log.debug( "manage.navigation.navigationCtrl");
			
			// Template for this controller
			$scope.view = 'modules/manage/navigation/navigation.html';

			$scope.common = Common;
		}
	]);
});
/**
*	Entry point for the manage.navigation module
*
*	@author Lakha Singh
*/
define('manage/navigation/main',[
	'manage/navigation/module',
	'manage/navigation/navigationCtrl'
], function(){});
/**
*	Defines booking module
*
*	@author Lakha Singh
*/
define('manage/module',[
	'angular',
	'manage/airports/main',
	'manage/flights/main',
	'manage/navigation/main'
], function( angular ){
	var module = angular.module('BookFlight.manage', [
		'BookFlight.manage.airports',
		'BookFlight.manage.flights',
		'BookFlight.manage.navigation'
	]);

	return module;
});
/**
*	Entry point for the Manage module
*
*	@author Lakha Singh
*/
define('manage/main',[
	'manage/module'
], function(){});
