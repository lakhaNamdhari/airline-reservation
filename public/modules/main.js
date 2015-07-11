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
		'booking': 'booking/module',
		'core': 'core/module',
		'search': 'search/module',
		'services': 'core/services',
		'utils': 'core/services/utils',
		'common': 'core/services/common',
		'airports': 'core/services/airports'
	},
	packages: ['services'],
	modules: [
		{
			name: 'core/main'
		},
		{
			name: 'booking/main'
		}
	],
	deps: [ 'angular', 'app' ],
	callback: function( angular ){
		angular.bootstrap( document.querySelector('body'), ['BookFlight']);
	}
});