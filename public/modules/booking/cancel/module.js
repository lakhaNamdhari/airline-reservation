/**
*	Defines cancelBooking module
*
*	@author Lakha Singh
*/
define([
	'angular',
	'core/module',
	'booking/module'
], function( angular ){
	var module = angular.module('booking.cancel', ['BookFlight.core', 'BookFlight.booking']);

	return module;
});