/**
*	Defines booking module
*
*	@author Lakha Singh
*/
define([
	'angular',
	'manage/airports/add/module',
	'manage/airports/remove/module'
], function( angular ){
	var module = angular.module('manage.airports', [
		'airports.add',
		'airports.remove'
	]);

	return module;
});