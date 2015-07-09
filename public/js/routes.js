
/**
*	Configure routes for Application
*
*	@author Lakha Singh
*/
angular
	.module( "appControllers" )
	.config( [
		'$routeProvider',
		function ( $routeProvider ){
			$routeProvider
				.when( "/", { templateUrl: "partials/reservations.html" } );
		}
	]);
