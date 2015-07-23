/**
*	App config
*
*	@author Lakha Singh
*/
require.config({
	shim: {
		'angular': {
			exports: 'angular'
		},
		'angular-resource': ['angular'],
		'angular-ui-router': ['angular'],
		'oclazyload': ['angular']
	},
	paths: {
		'angular': '../vendor/angular',
		'angular-resource': '../vendor/angular-resource',
		'angular-ui-router': '../vendor/angular-ui-router',
		'oclazyload': '../vendor/oclazyload',
		'services': 'core/services'
	},
	packages: ['services'],
	modules: [
		{
			name: 'main'
		},
		{
			name: 'booking/main',
			exclude: ['services']
		},
		{
			name: 'manage/main',
			exclude: ['services']
		}
	]
});