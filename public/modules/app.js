/**
*	Defines app module
*
*	@author Lakha Singh
*/
define([
	'angular',
	'angular-route',
	'booking/module',
	'search/module'
], function( angular ){
	var module = angular.module('BookFlight', [
		'ngRoute',
		'booking.cancel',
		'booking.new',
		'BookFlight.search'
	]);

	return module;
});