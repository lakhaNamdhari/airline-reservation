/**
*	Entry point for the app
*
*	@author Lakha Singh
*/
require.config({
	shim: {
		'angular': {
			exports: 'angular'
		},
		'angular-resource': ['angular'],
		'angular-route': ['angular']
	},
	paths: {
		'angular': '../vendor/angular',
		'angular-resource': '../vendor/angular-resource',
		'angular-ui-router': '../vendor/angular-ui-router',
		'services': 'core/services'
	},
	packages: ['services'],
	deps: [ 'angular', 'states', 'booking/main', 'manage/main', 'header/main' ],
	callback: function( angular ){
		angular.bootstrap( document.querySelector('body'), ['BookFlight']);
	}
});