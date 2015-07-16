/**
*	Defines booking module
*
*	@author Lakha Singh
*/
define([
	'angular',
	'manage/flights/add/module',
	'manage/flights/remove/module'
], function( angular ){
	var module = angular.module('manage.flights', [
		'flights.add',
		'flights.remove'
	]);

	return module;
});