/**
*	Defines booking module
*
*	@author Lakha Singh
*/
define([
	'angular',
	'./cancel/module',
	'./new/module'
], function( angular ){
	var module = angular.module('BookFlight.booking', [
		'booking.cancel',
		'booking.new'
	]);

	return module;
});