/**
*	common methods
*
*	@author Lakha Singh
*/
define([
	'core/module',
	'airports',
	'utils'
], function( core ){
	core.factory( "core.Common", [
		'core.Airports',
		'core.Utils',
		function ( Airports, Utils ){
			return {
				// returns airport-names for airport-code 
				getAirportName: (function(){
					// Map of Airportcode: airportName
					var airportNames = {};

					// raw response from Airports service
					var airports = Airports.query(function(){
						for ( i = 0; i < airports.length; i++ ){
							airportNames[ airports[ i ][ "code"] ] = airports[ i ][ "city"];
						}
					});

					return function( airportCode ){
						Utils.log( "core.services.Common" );

						return airportNames[ airportCode ];
					};
				}())
			}
		}		
	]);
});
