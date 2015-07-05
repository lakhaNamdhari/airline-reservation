
/**
*	Configure routes for Application
*
*	@author Lakha Singh
*/
angular
	.module( "appControllers" )
	.config( function ( $routeProvider ){
		$routeProvider
			.when( "/", { templateUrl: "partials/reservations.html" } );
	});
