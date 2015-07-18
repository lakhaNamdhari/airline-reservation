/**
*	Defines app module
*
*	@author Lakha Singh
*/
define([
	'angular',
	'angular-ui-router',
	'booking/module',
	'manage/module',
	'header/module'
], function( angular ){
	var module = angular.module('BookFlight', [
		'ui.router',
		'BookFlight.booking',
		'BookFlight.manage',
		'BookFlight.header'
	]);

	return module;
});