/**
*	Defines app module
*
*	@author Lakha Singh
*/
define([
	'angular',
	'angular-route',
	'core',
	'booking'
], function( angular){
	var module = angular.module('BookFlight', ['angular-route', 'core', 'booking']);

	return module;
});