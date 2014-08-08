
(function( ns ){

	var controller = ns.controller = ns.controller || {};
	
	controller.Reservations = function ( $scope, Reservations, Flights, Airports ){
		
		$scope.setActiveMenu( "reservations" );

		// Contains all Reservation data
		$scope.reservations = Reservations.query();
		
		// Contains all the flight Data
		$scope.flights = Flights.query();
		
		// Contains all airports data
		$scope.airports = Airports.query();
		
		// Flag to show / hide the suggestion list
		$scope.show = {
			origin: true,
			destination: true
		};

		$scope.selectPlace = function( field, airportCode ){
			$scope.reservation[ field ] = airportCode;

			// Hide the suggestion List
			$scope.show[ field ] = false;
		};
		
		$scope.reserveFlight = function(){
			var flightInfo = {
				origin: $scope.reservation.origin,
				destination: $scope.reservation.destination
			};
			
			Reservations.save( flightInfo, function( data ){
				// Desplay on page
				$scope.reservations.push( data );
				
				// Clear form
				$scope.reservation.origin = "";
				$scope.reservation.destination = "";
			});
		};	
	};

}( window.AL = window.AL || {} ));