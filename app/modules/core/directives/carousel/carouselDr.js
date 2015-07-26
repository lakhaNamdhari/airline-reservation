/**
*	Implemented carousel as a Directive
*
*	Usage :
*	<bf-carousel>
*		\\ your data goes here
*	</bf-carousel>
*
*	@author Lakha Singh
*/
define([
	'core/module',
	'angular',
	'services'
], function( module, angular ){
	module.directive( "bfCarousel", [
		'core.Utils',
		function ( Utils ){
			Utils.log( "core.directives.bfCarousel" );

			return {
				restrict: 'E',
				transclude: true,
				template: '<a><span class="glyphicon glyphicon-chevron-up"></span></a>\
								<div class="content" ng-transclude></div>\
						   <a><span class="glyphicon glyphicon-chevron-down"></span></a>',
				link: function( scope, $el, attrs ){
					var children =  $el.children(),
						btnUp = angular.element( children[0] ),
						$content = angular.element( children[1] ),
						btnDown = angular.element( children[2] ),
						slideHeight = $el.prop('offsetHeight'),
						contentHeight;

					btnUp.on('click', function(){
						var margin = parseInt($content.css('margin-top')) || 0,
							newMargin = margin + slideHeight,
							bound = 0;

						// Refresh content height
						contentHeight = $content.prop('offsetHeight');

						// restricting in bounds
						newMargin = (newMargin > bound ? bound : newMargin)+'px';
						$content.css('margin-top', newMargin ); 
					});					

					btnDown.on('click', function(){
						var margin = parseInt($content.css('margin-top')) || 0,
							newMargin = margin - slideHeight,
							bound = contentHeight - slideHeight;

						// Refresh content height
						contentHeight = $content.prop('offsetHeight');

						// restricting in bounds
						newMargin = (-1*newMargin > bound  ? -bound : newMargin)+'px';
						$content.css('margin-top', newMargin ); 
					});
				}
			};
		}
	]);
});
