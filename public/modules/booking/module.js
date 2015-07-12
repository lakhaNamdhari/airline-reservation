/**
*	Defines booking module
*
*	@author Lakha Singh
*/
define([
	'angular',
	'booking.cancel.module',
	'booking.new.module'
], function( angular ){
	var module = angular.module('BookFlight.booking', [
		'booking.cancel',
		'booking.new'
	]);

	return module;
});