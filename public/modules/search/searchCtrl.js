/**
*	Controller for search module
*
*	@author Lakha Singh
*/
define([
	'search/module',
	'services'
], function( search ){
	search.controller('searchCtrl', [
		'$scope',
		'core.Airports', 
		'core.Utils',
		'core.Interface',
		function ( $scope, Airports, Utils, Interface ){
			Utils.log( "search.searchCtrl");
			
			// Template for this controller
			$scope.view = './search.tpl.html';

			// Airport data
			$scope.airports = Airports.query();

			// Toggle suggestion list
			$scope.show = {
				origin: true,
				destination: true
			};
			
			// for comm b/w search and book.new module
			Interface.search = Interface.search || [];

			// Search's flights based on origin and destination code
			$scope.searchFlights = function( query ){			
				$scope.flights = Flights.query( query, function(){
					while( Interface.search.length ){
						Interface.search.pop();
					}
					for ( i = 0; i < $scope.flights.length; i++ ){
						Interface.search.push( $scope.flights[i] );
					}
				});					
			};

			// Updates input box with selected value from popup
			$scope.selectPlace = function( field, airportCode ){
				$scope.search[ field ] = airportCode;

				// Hide the suggestion List
				$scope.show[ field ] = false;
			};
		}
	]);
});