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
		'core.Utils',
		'core.Common',
		function ( $scope, $location, Utils, Common ){
			Utils.log( "header.headerCtrl");
			
			// Template for this controller
			$scope.view = 'modules/header/header.html';

			$scope.common = Common;
		}
	]);
});