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
		'core': 'core/module',
		'search': 'search/module',
		'services': 'core/services',
		'utils': 'core/services/utils',
		'common': 'core/services/common',
		'airports': 'core/services/airports',
		'booking': 'booking/module'
	},
	packages: ['services'],
	deps: [ 'angular', 'routes' ],
	callback: function( angular ){
		angular.bootstrap( document.querySelector('body'), ['BookFlight']);
	}
});