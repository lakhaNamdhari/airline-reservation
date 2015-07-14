/**
*	Defines booking module
*
*	@author Lakha Singh
*/
define([
	'angular',
	'core/module'
], function( angular ){
	var module = angular.module('manage.airports', [
		'BookFlight.core'
	]);

	return module;
});