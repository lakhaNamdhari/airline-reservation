/**
*	Global module
*
*	@author Lakha Singh
*/
(function(){
	var global = angular.module( "global" );

	/**
	*	Utility functions
	*/
	global.factory( "Util", [
		'$window',
		function ( $window ){
			var debug = false;

			return {
				// enable / disable logs
				debug: function( value ){
					debug = value && value || false;
				},

				// log output to console
				log: function( text ){
					if ( debug ){
						$window.console.log( text );
					}
				}
			}
		}
	]);

	/**
	*	shared app functions
	*/
	global.factory( "Core", [
		'$resource',
		'Airports',
		'Util',
		function ( $resource, Airports, Util ){
			return {
				// returns airport-name for airport-code 
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
						Util.log( "global.Core.getAirportName" );

						return airportNames[ airportCode ];
					};
				}())
			}
		}		
	]);
}());
