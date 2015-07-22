/**
*	Build config for BookFlight
*
*	@author Lakha Singh	
*/

module.exports = function( grunt ){
	grunt.config({
		copy: {
			dest: {
				expand: true,
				cwd: 'app'
				src: '**'
				dest: 'public'			
			}
		},

		requirejs: {
			compile: {
				options: {
					keepBuildDir: true,
					dir: 'public/modules',
					mainConfigFile: 'app/modules/main.js'				
				}
			}
		}
	});

	// Register default task
	grunt.registerTask('default', ['copy', 'requirejs']);

	// Load Task
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
}