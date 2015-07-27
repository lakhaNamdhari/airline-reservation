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
	'angular'
], function( module, angular ){
	module.directive( "bfCarousel", [
		'$log',
		function ( $log ){
			$log.debug( "core.directives.bfCarousel" );

			return {
				restrict: 'E',
				transclude: true,
				template: '<a><span ng-click="hBtnUp()" class="glyphicon glyphicon-chevron-up"></span></a>\
								<div class="content" ng-transclude></div>\
						   <a><span ng-click="hBtnDown()" class="glyphicon glyphicon-chevron-down"></span></a>',
				link: function( scope, $el, attrs ){
					var $content =  angular.element( $el.children()[1] ),
						slideHeight = $el.prop('offsetHeight'),
						contentHeight;

					scope.hBtnUp = function(){
						var margin = parseInt($content.css('margin-top')) || 0,
							newMargin = margin + slideHeight,
							bound = 0;

						// Refresh content height
						contentHeight = $content.prop('offsetHeight');

						// restricting in bounds
						newMargin = (newMargin > bound ? bound : newMargin)+'px';
						$content.css('margin-top', newMargin ); 
					}		

					scope.hBtnDown = function(){
						var margin = parseInt($content.css('margin-top')) || 0,
							newMargin = margin - slideHeight,
							bound = contentHeight - slideHeight;

						// Refresh content height
						contentHeight = $content.prop('offsetHeight');

						// restricting in bounds
						newMargin = (-1*newMargin > bound  ? -bound : newMargin)+'px';
						$content.css('margin-top', newMargin ); 					
					}				
				}
			};
		}
	]);
});
