/**
*	Entry point for the app
*
*	@author Lakha Singh
*/
require([
	'angular',
	'app',
	'states'
], function( angular ){
	angular.bootstrap( document, ['BookFlight']);
})