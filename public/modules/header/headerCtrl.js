/**
*	Controller for header module
*
*	@author Lakha Singh
*/
define([
	'./module',
	'services'
], function( module ){
	module.controller('header.headerCtrl', [
		'$scope',
		'$location',
		'core.Utils',
		function ( $scope, $location, Utils ){
			Utils.log( "header.headerCtrl");
			
			// Template for this controller
			$scope.view = 'modules/header/header.html';

			// Activates the nav as per url
			$scope.activateNav = function( page ){
				var url = $location.path().substring(1);

				return url.indexOf( page ) > -1 ? 'active' : '';
			};
		}
	]);
});