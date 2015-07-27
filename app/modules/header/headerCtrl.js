/**
*	Controller for header module
*
*	@author Lakha Singh
*/
define([
	'./module',
	'services'
], function( module ){
	module.controller('BookFlight.headerCtrl', [
		'$scope',
		'$location',
		'$log',
		'core.Common',
		function ( $scope, $location, $log, Common ){
			$log.debug( "header.headerCtrl");
			
			// Template for this controller
			$scope.view = 'modules/header/header.html';

			$scope.common = Common;
		}
	]);
});