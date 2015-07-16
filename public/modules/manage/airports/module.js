/**
*	Defines booking module
*
*	@author Lakha Singh
*/
define([
	'angular',
	'manage/airports/add/module'
], function( angular ){
	var module = angular.module('manage.airports', [
		'airports.add'
	]);

	return module;
});