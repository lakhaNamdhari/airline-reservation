
(function( ns ){

	var controller = ns.controller = ns.controller || {};
	
	controller.Flights = function ( $scope, Flights ){
		
		$scope.setActiveMenu( "flights" );
		// Shared Object
		angular.extend( $scope, {
			flights: Flights.query()
		});		
	};

}( window.AL = window.AL || {} ));