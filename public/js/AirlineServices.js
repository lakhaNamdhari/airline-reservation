
(function( ns ){

	var service = ns.service = ns.service || {};
	
	service.Airports = function ( $resource ){
		return $resource("/airports/:airportCode");
	};

	service.Flights = function ( $resource ){
		return $resource("/flights");
	};

	service.Reservations = function ( $resource ){
		return $resource("/reservations");
	};

	angular.module( "airlineServices", ["ngResource"] )
		.factory( "Airports", service.Airports )
		.factory( "Flights", service.Flights )
		.factory( "Reservations", service.Reservations );

}( window.AL = window.AL || {} ));
