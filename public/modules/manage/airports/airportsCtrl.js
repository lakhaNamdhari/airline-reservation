/**
*	Controller for manage.airports module
*
*	@author Lakha Singh
*/
define([
	'./module',
	'services'
], function( module ){
	module.controller('manage.airportsCtrl', [
		'$scope',
		'core.Utils',
		function ( $scope, Utils ){
			Utils.log( "manage.airports.airportsCtrl");
			
			// Template for this controller
			$scope.view = 'modules/manage/airports/airports.html';

		}
	]);
});