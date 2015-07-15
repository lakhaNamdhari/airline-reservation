/**
*	Defines booking module
*
*	@author Lakha Singh
*/
define([
	'angular',
	'core/module'
], function( angular ){
	var module = angular.module('BookFlight.manage', [
		'BookFlight.core',
		'manage.airports',
		'manage.flights',
		'manage.navigation'
	]);

	return module;
});