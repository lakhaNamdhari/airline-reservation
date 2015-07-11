/**
*	Defines booking module
*
*	@author Lakha Singh
*/
define([
	'angular',
	'booking.cancel',
	'booking.new'
], function( angular ){
	var module = angular.module('BookFlight.booking', [
		'booking.cancel',
		'booking.new'
	]);

	return module;
});