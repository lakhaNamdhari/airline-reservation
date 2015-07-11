/**
*	Utility methods
*
*	@author Lakha Singh
*/
define([
	'core'
], function( core ){
	core.factory( "core.Utils", [
		'$window',
		function ( $window ){
			var debug = false;

			return {
				// enable / disable logs
				debug: function( value ){
					debug = value && value || false;
				},

				// log output to console
				log: function( text ){
					if ( debug ){
						$window.console.log( text );
					}
				}
			}
		}
	]);	
});
