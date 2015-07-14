/**
*	Defines booking module
*
*	@author Lakha Singh
*/
define([
	'angular',
	'core/module',
	'booking/cancel/module',
	'booking/new/module',
	'booking/search/module'
], function( angular ){
	var module = angular.module('BookFlight.booking', [
		'BookFlight.core',
		'booking.cancel',
		'booking.new',
		'booking.search'
	]);

	return module;
});