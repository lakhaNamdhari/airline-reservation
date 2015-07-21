/**
*	Defines booking module
*
*	@author Lakha Singh
*/
define([
	'angular',
	'core/module'
], function( angular ){
	var module = angular.module('BookFlight.booking', [
		'BookFlight.core'
	]);

	return module;
});