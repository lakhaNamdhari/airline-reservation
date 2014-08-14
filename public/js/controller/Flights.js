
(function( ns ){

	var controller = ns.controller = ns.controller || {};
	
	controller.Flights = function ( $scope, Flights, Airports ){
		console.log( "Controller.Flights" );

		var i;
		
		// Airports data
		var airports = Airports.query();

		// Activates Current section in the Main Menu
		$scope.setActiveMenu( "flights" );
		
		// Flights data
		$scope.flights = Flights.query();	
	};

}( window.AL = window.AL || {} ));