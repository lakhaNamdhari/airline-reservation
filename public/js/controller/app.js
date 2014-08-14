
(function( ns ){

	var controller = ns.controller = ns.controller || {};
	
	controller.AppController = function ( $scope, Airports ){
	
		// Map of Airportcode: airportName
		var airportNames;

		// Airports data
		var airports = Airports.query();

		// To set active Menu Item
		$scope.setActiveMenu = function( item ){
			$scope.destinationsActive = $scope.flightsActive = $scope.reservationsActive = "";
			
			$scope[ item + "Active" ] = "active";
		};
		
		// Flight Detail Partial path
		$scope.airport = "partials/airport.html";

		// Returns AirportName to airportCode
		$scope.getAirportName = function( airportCode ){
			console.log( "Controller.AppController.getAirportName()" );

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