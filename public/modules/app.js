/**
*	Defines app module
*
*	@author Lakha Singh
*/
define([
	'angular',
	'booking/main',
	'search/main'
], function( angular ){
	var module = angular.module('BookFlight', ['BookFlight.booking', 'BookFlight.search']);

	return module;
});