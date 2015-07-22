/**
*	Defines app module
*
*	@author Lakha Singh
*/
define([
	'angular',
	'angular-ui-router',
	'oclazyload',
	'core/main',
	'header/main'
], function( angular ){
	var module = angular.module('BookFlight', [
		'ui.router',
		'oc.lazyLoad',
		'BookFlight.core',
		'BookFlight.header'
	]);

	return module;
});