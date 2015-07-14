/**
*	Controller for search module
*
*	@author Lakha Singh
*/
define([
	'./module',
	'services'
], function( module ){
	module.controller('search.searchCtrl', [
		'$scope',
		'core.Airports', 
		'core.Utils',
		'$location',
		function ( $scope, Airports, Utils, $location ){
			Utils.log( "search.searchCtrl");
			
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