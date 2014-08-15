/**
*	Services for Application
*
*	@author Lakha Singh
*/
(function(){
	var service = angular.module( "appServices" );

	/**
	*	Service to access Airports Data
	*/
	service.factory( "Airports", function ( $resource ){
		return $resource("airCanadaAPI/v1/airports/:airportCode");
	});

	/**
	*	Service to access Flights Data
	*/
	service.factory( "Flights", function ( $resource ){
		return $resource("airCanadaAPI/v1/flights/:origin/:destination");
	});

	/**
	*	Service to access Reservations Data
	*/
	service.factory( "Reservations", function ( $resource ){
		return $resource("airCanadaAPI/v1/reservations/:bookingId");
	});
}());
