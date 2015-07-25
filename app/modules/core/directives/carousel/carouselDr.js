/**
*	Implemented carousel as a Directive
*
*	Usage :
*	<bf-carousel>
*		<li>Data1</li>
*		<li>Data2</li>
*		<li>Data3</li>
*	</bf-carousel>
*
*	@author Lakha Singh
*/
define([
	'core/module',
	'services'
], function( module ){
	module.directive( "bfCarousel", [
		'core.Utils',
		function ( Utils ){
			Utils.log( "core.directives.bfCarousel" );

			return {
				restrict: 'E',
				template: '<span class="glyphicon glyphicon-chevron-up"><span>\
								<ul></ul>\
							<span class="glyphicon glyphicon-chevron-down"></span>'
			};
		}
	]);
});
