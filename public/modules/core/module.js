/**
*	Defines core module
*
*	@author Lakha Singh
*/
define([
	'angular',
	'angular-resource'
], function( angular ){
	var module = angular.module('BookFlight.core', ['ngResource']);

	return module;
});