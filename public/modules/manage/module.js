/**
*	Defines booking module
*
*	@author Lakha Singh
*/
define([
	'angular',
	'./airports/module',
	'./flights/module',
	'./navigation/module'
], function( angular ){
	var module = angular.module('BookFlight.manage', [
		'manage.airports',
		'manage.flights',
		'manage.navigation'
	]);

	return module;
});