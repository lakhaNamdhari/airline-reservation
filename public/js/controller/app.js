
(function( ns ){

	var controller = ns.controller = ns.controller || {};
	
	controller.AppController = function ( $scope ){
		// Shared Object
		angular.extend( $scope, {			
			// To set active Menu Item
			setActiveMenu: function( item ){
				$scope.destinationsActive = $scope.flightsActive = $scope.reservationsActive = "";
				
				$scope[ item + "Active" ] = "active";
			},
			
			// Flight Detail Partial path
			airport: "partials/airport.html"
		});		
	};

}( window.AL = window.AL || {} ));