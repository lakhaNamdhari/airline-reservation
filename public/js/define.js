
/**
*	Define application level objects here.
*
*	@author Lakha Singh
*/

// Define module for application contriollers
angular.module( "appServices", [ "ngResource" ] );

// Define module for application contriollers
angular.module( "appControllers", [ "appServices" ] );

// Define module for application contriollers
angular.module( "airline", [ "ngRoute", "appControllers" ] );
