
(function( ns ){

	var service = ns.service = ns.service || {};
	
	service.Airports = function ( $resource ){
		return $resource("airCanadaAPI/v1/airports/:airportCode");
	};

	service.Flights = function ( $resource ){
		return $resource("airCanadaAPI/v1/flights/:origin/:destination");
	};

	service.Reservations = function ( $resource ){
		return $resource("airCanadaAPI/v1/reservations/:bookingId");
	};

	angular.module( "airlineServices", ["ngResource"] )
		.factory( "Airports", service.Airports )
		.factory( "Flights", service.Flights )
		.factory( "Reservations", service.Reservations );

}( window.AL = window.AL || {} ));
