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