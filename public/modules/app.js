/**
*	Defines app level module
*
*	@author Lakha Singh
*/

define([
	'angular',
	'angular-route'
], function( angular){
	var module = angular.module('BookFlight', ['angular-route', 'core', 'booking']);

	return module;
});