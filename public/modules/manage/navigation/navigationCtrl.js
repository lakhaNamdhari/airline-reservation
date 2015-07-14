/**
*	Controller for manage.navigation module
*
*	@author Lakha Singh
*/
define([
	'./module',
	'services'
], function( module ){
	module.controller('navigation.navigationCtrl', [
		'$scope',
		'core.Utils',
		function ( $scope, Utils ){
			Utils.log( "manage.navigation.navigationCtrl");
			
			// Template for this controller
			$scope.view = 'modules/manage/navigation/navigation.html';

		}
	]);
});