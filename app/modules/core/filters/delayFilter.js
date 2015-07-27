/**
*	Custom Filter- delay
*	It is used to format time as delayed
*
*	@Lakha Singh
*/

define([
	'core/module'
], function( module ){
	module.filter('core.delay', function(){
		return function( time ){
			time = parseInt( time );
			time = (time < 10 ? '0'+time : ''+time)+':00';
			return ' by ' + time + ' hrs';
		}
	});
})