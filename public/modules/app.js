/**
*	Defines app module
*
*	@author Lakha Singh
*/
define([
	'angular',
	'booking/module',
	'search/module'
], function( angular ){
	var module = angular.module('BookFlight', ['BookFlight.booking', 'BookFlight.search']);

	return module;
});