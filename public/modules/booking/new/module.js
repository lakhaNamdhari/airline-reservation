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
	var module = angular.module('booking.new', ['BookFlight.core']);

	return module;
});