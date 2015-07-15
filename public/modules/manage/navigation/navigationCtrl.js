/**
*	Controller for manage.navigation
*
*	@author Lakha Singh
*/
define([
	'./module',
	'services'
], function( module ){
	module.controller('manage.navigationCtrl', [
		'$scope',
		'$location',
		'core.Utils',
		'core.Common',
		function ( $scope, $location, Utils, Common ){
			Utils.log( "manage.navigation.navigationCtrl");
			
			// Template for this controller
			$scope.view = 'modules/manage/navigation/navigation.html';

			$scope.common = Common;
		}
	]);
});