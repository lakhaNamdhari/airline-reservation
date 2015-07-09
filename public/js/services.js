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
	service.factory( "Airports", [
		'$resource',
		'Util',
		function ( $resource, Util ){
			Util.log( "appServices.Airports" );

			return $resource("airCanadaAPI/v1/airports/:airportCode");
		}
	]);

	/**
	*	Service to access Flights Data
	*/
	service.factory( "Flights",[
		'$resource',
		'Util',
		 function ( $resource, Util ){
			Util.log( "appServices.Flights" );

			return $resource("airCanadaAPI/v1/flights/:origin/:destination");
		}
	]);

	/**
	*	Service to access Reservations Data
	*/
	service.factory( "Reservations", [
		'$resource',
		'Util',
		function ( $resource, Util ){
			Util.log( "appServices.Reservations" );

			return $resource("airCanadaAPI/v1/reservations/:bookingId");
		}
	]);

	/**
	*	Interface - acts as a glue b/w different controllers
	*/
	service.factory( "Interface", [
		function (){
			return {};
		}
	]);
}());
