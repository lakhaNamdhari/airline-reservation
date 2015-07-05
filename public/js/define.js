
/**
*	Define Angular's application level objects here.
*
*	@author Lakha Singh
*/

// Define module for application services
angular.module( "appServices", [ "ngResource" ] );

// Define module for application global fns
angular.module( "global", [ "appServices" ] );

// Define module for application contriollers
angular.module( "appControllers", [ "global" ] );

// Define module for application
angular.module( "airline", [ "ngRoute", "appControllers" ] );
