/**
*	Defines app module
*
*	@author Lakha Singh
*/
define([
	'angular',
	'angular-route',
	'booking/module',
	'manage/module',
	'header/module'
], function( angular ){
	var module = angular.module('BookFlight', [
		'ngRoute',
		'BookFlight.booking',
		'BookFlight.manage',
		'BookFlight.header'
	]);

	return module;
});