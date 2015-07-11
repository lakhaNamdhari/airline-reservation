/**
*	Controller for search module
*
*	@author Lakha Singh
*/
define([
	'search',
	'airports',
	'utils'
], function( search, Common ){
	search.controller('searchCtrl', [
		'$scope',
		'core.Airports', 
		'core.Utils',
		function ( $scope, Airports, Utils ){
			Utils.log( "search.searchCtrl");
			
			// Template for this controller
			$scope.view = './search.tpl.html';

			// Airport data
			$scope.airports = Airports.query();

			// Core Functions
			$scope.core = Common;

			// Toggle suggestion list
			$scope.show = {
				origin: true,
				destination: true
			};

			// Updates input box with selected value from popup
			$scope.selectPlace = function( field, airportCode ){
				$scope.flightQuery[ field ] = airportCode;

				// Hide the suggestion List
				$scope.show[ field ] = false;
			};
		}
	]);
});