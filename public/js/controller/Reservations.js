
(function( ns ){

	var controller = ns.controller = ns.controller || {};
	
	controller.Reservations = function ( $scope, Reservations, Flights, Airports ){

		// Contains all Reservation data
		$scope.reservations = Reservations.query();
		
		// Contains all airports data
		$scope.airports = Airports.query(function(){
			$scope.getAirportName = $scope.getAirportName();
		});
		
		// Flag to show / hide the suggestion list
		$scope.show = {
			origin: true,
			destination: true
		};

		/**
		*	To retrieve airport name using airport code
		*
		*	@method reserveFlight
		*/
		$scope.getAirportName = function(){
			// Map of Airportcode: airportName
			var airportNames;

			return function( airportCode ){
				console.log( "Controller.AppController.getAirportName()" );

				if ( !airportNames ){
					airportNames = {};

					for ( i = 0; i < $scope.airports.length; i++ ){
						airportNames[ $scope.airports[ i ][ "code"] ] = $scope.airports[ i ][ "name"];
					}
				}

				return airportNames[ airportCode ];
			};
		};

		/**
		*	To Choose city from popup menu
		*
		*	@method reserveFlight
		*/
		$scope.selectPlace = function( field, airportCode ){
			$scope.reservation[ field ] = airportCode;

			// Hide the suggestion List
			$scope.show[ field ] = false;
		};
		
		/**
		*	To Book a flight
		*
		*	@method reserveFlight
		*/
		$scope.reserveFlight = function( flight ){
			Reservations.save( flight, function( data ){
				// Desplay on page
				$scope.reservations.push( flight );
			});
		};

		/**
		*	To Search Flights
		*
		*	@method reserveFlight
		*/
		$scope.searchFlights = function( query ){			
			$scope.flights = Flights.query( query );
		};

		/**
		*	To Search Flights
		*
		*	@method reserveFlight
		*/
		$scope.cancelFlight = function( flight ){			
			Reservations.remove( { bookingId: flight.number }, function( data ){
				// Desplay on page
				var i;

				for ( i = 0; i < $scope.reservations.length; i++ ){
					if (  $scope.reservations[ i ][ "number" ] === flight.number ){
						$scope.reservations.splice( i, 1 );
						break;
					}
				}
			});
		};	
	};

}( window.AL = window.AL || {} ));