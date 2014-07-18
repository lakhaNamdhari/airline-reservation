
(function( ns ){

	var controller = ns.controller = ns.controller || {};
	
	controller.Flights = function ( $scope, Flights, Airports ){
		console.log( "Controller.Flights" );

		var airports = Airports.query();

		$scope.setActiveMenu( "flights" );
		
		// Flights data
		$scope.flights = Flights.query();	

		$scope.getAirportName = (function(){
			var i, airportNames = {};
			
			for ( i = 0; i < airports.length; i++ ){
				airportNames[ airports[ i ][ "code"] ] = airports[ i ][ "name"];
			}

			return function( airportCode ){
				console.log( "Controller.Flights.getAirportName()" );

				return airportNames[ airportCode ];
			};
		}());
	};

}( window.AL = window.AL || {} ));