/**
*	Defines booking module
*
*	@author Lakha Singh
*/
define([
	'angular',
	'core/module',
	'angular-resource'
], function( angular ){
	var module = angular.module('BookFlight.booking', [
		'ngResource',
		'BookFlight.core'
	]);

	return module;
});