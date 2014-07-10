
(function( ns ){

	var controller = ns.controller = ns.controller || {};
	
	controller.Reservations = function ( $scope, Reservations, Flights, Airports ){
		
		$scope.setActiveMenu( "reservations" );
		// Shared Object
		angular.extend( $scope, {
			// Contains all Reservation data
			reservations: Reservations.query(),
			
			// Contains all the flight Data
			flights: Flights.query(),
			
			// Contains all airports data
			airports: Airports.query(),
			
			selectPlace: function( field, airportCode ){
				$scope[ field ][ "city" ] = airportCode;
				$scope[ "show" ][ field ] = false;
			},
			
			reserveFlight: function(){
				var flightInfo = {
					origin: $scope.origin.city,
					destination: $scope.destination.city
				};
				
				Reservations.save( flightInfo, function( data ){
					// Desplay on page
					$scope.reservations.push( data );
					
					// Clear form
					$scope.origin.city = "";
					$scope.destination.city = "";
				});
			}
		});		
	};

}( window.AL = window.AL || {} ));