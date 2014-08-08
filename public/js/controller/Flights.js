
(function( ns ){

	var controller = ns.controller = ns.controller || {};
	
	controller.Flights = function ( $scope, Flights, Airports ){
		console.log( "Controller.Flights" );

		var i;
		
		// Airports data
		var airports = Airports.query();

		// Map of Airportcode: airportName
		var airportNames;

		// Activates Current section in the Main Menu
		$scope.setActiveMenu( "flights" );
		
		// Flights data
		$scope.flights = Flights.query();	

		// Returns AirportName to airportCode
		$scope.getAirportName = function( airportCode ){
			console.log( "Controller.Flights.getAirportName()" );

			if ( !airportNames ){
				airportNames = {};

				for ( i = 0; i < airports.length; i++ ){
					airportNames[ airports[ i ][ "code"] ] = airports[ i ][ "name"];
				}
			}

			return airportNames[ airportCode ];
		};
	};

}( window.AL = window.AL || {} ));