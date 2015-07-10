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
		'core' : 'core/main',
		'booking' : 'booking/main'
	},
	modules: [
		{
			name: 'core'
		},
		{
			name: 'booking'
		}
	],
	deps: [ 'angular', 'app' ],
	callback: function( angular ){
		angular.bootstrap( document.querySelector('body'), ['BookFlight']);
	}
});