
/**
*	Configure routes for Application
*
*	@author Lakha Singh
*/
angular
	.module( "airline" )
	.config( function ( $routeProvider ){
		$routeProvider
			.when( "/", { templateUrl: "partials/reservations.html" } );
	});
