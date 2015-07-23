/**
*	Build config for BookFlight
*
*	@author Lakha Singh	
*/

module.exports = function( grunt ){
	grunt.initConfig({
		copy: {
			dest: {
				expand: true,
				cwd: 'app',
				src: '**',
				dest: 'public'			
			}		
		},

		requirejs: {
			compile: {
				options: {
					dir: 'public/modules',
					optimize: 'none',
					removeCombined: true,
					mainConfigFile: 'app/modules/config.js'				
				}
			}
		},

		clean: {
			options: {
				force: true
			},

			modules: [
				'public/modules/config.js'
			]
		}
	});

	// Register default task
	grunt.registerTask('default', ['copy:dest', 'requirejs', 'clean']);

	// Load Task
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-clean');
}