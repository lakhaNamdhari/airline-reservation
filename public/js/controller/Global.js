/**
*	Global Controller, at rootScope level.
*	App level shared functions go here.
*
*	@author Lakha Singh
*	@class Global
*/
(function(){
	// Name of this component
	var ctrlName = "Global";

	// Application module
	var app = angular.module( "appControllers" );
	
	// Register Controller
	app.controller( ctrlName, function ( $scope, Airports, $window ){
		$scope.airports = Airports.query(function(){
			/**
			*	To retrieve airport name using airport code
			*
			*	@method getAirportName
			*/
			$scope.getAirportName = (function(){
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
			}());
		});

		/* Namespace for util functions*/
		$scope.util = {
			/**
			*	Function to enable console logs based on debug flag.
			*	Logs are disabled by default, but can be enabled for dev env
			*	
			*	@method log
			*/
			log: function( text ){
				if ( typeof $scope.util.log.debug === "boolean" && $scope.util.log.debug ){
					$window.console.log( text );
				}
			}
		};

		/* Namespace for Events */
		$scope.events = {
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
		};

		// Set true to enable logs
		$scope.util.log.debug = true;
	});
}());