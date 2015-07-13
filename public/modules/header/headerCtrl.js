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
		'Utils'
		function ( $scope, $location, Utils ){
			Utils.log( "header.headerCtrl");
			
			// Template for this controller
			$scope.view = 'modules/header/header.html';

			// Activates the nav as per url
			$scope.activateNav = function( page ){
				return page == $location.path().substring(1) ? 'active' : '';
			};
		}
	]);
});