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
	global.factory( "Util", function ( $window ){
		var debug = false;

		return {
			// enable / disable logs
			debug: function( value ){
				console.log( "util.debug()" );

				debug = value && value || false;
			},

			// log output to console
			log: function( text ){
				console.log( "util.log()" );

				if ( debug ){
					$window.console.log( text );
				}
			}
		}
	});

	/**
	*	shared app functions
	*/
	global.factory( "Shared", function ( $resource, Airports ){
		
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
					console.log( "common.getAirportName()" );

					return airportNames[ airportCode ];
				};
			}())
		}
	});

	/**
	*	Events
	*/
	global.factory( "CEvents", function (){
		return {
			/**
			*	Emitted when a new reservation completes.
			*
			*	@emits reservationObject
			*/
			newReservation: "new/reservation",

			/**
			*	Emitted when a new reservation is canceled.
			*
			*	@emits reservationObject
			*/
			cancelReservation: "cancel/reservation"
		}
	});

}());
