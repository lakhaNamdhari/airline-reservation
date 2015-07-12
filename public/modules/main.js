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
		'angular-route': '../vendor/angular-route',
		'services': 'core/services'
	},
	packages: ['services'],
	deps: [ 'angular', 'routes', 'search/main', 'booking/main' ],
	callback: function( angular ){
		angular.bootstrap( document.querySelector('body'), ['BookFlight']);
	}
});