/**
*	Provider to fetch airportname based on code
*
*	@author Lakha Singh
*/

define([
	'core/module',
	'services'
], function( module ){
	module.provider('core.AirportName', function(){
		var opts = {
			sync: false, // doesn't sync airportnames unless page is refreshed
			interval: 30  // sync interval in sec
		};

		// if set, data is refreshed from server after interval elapses 
		this.sync = function( val ){
			opts.sync = typeof val === 'boolean' && val || opts.sync;
		}

		// useful if sync is true
		this.interval = function( val ){
			opts.interval = typeof val === 'number' && val || opts.interval;
		}		

		// service config
		this.config = function( opts ){
			if ( typeof opts === 'object'){
				this.sync( opts.sync );
				this.interval( opts.interval );
			}
		}

		this.$get = [
			'core.Airports',
			'$interval',
			'$log',
			function( Airports, $interval, $log ){
				$log.debug('core.providers.airportname');

				// Map of Airportcode: airportName
				var airportNames;

				// raw response from Airports service
				var airports;

				var _fetch = function(){
					airportNames = {};

					airports = Airports.query(function(){
						for ( i = 0; i < airports.length; i++ ){
							airportNames[ airports[ i ][ "code"] ] = airports[ i ][ "city"];
						}
					});
				};

				// fetch data
				_fetch();

				if ( opts.sync ){
					$interval( _fetch, opts.interval * 1000 );
				}

				return {
					get: function( airportCode ){
						return airportNames[ airportCode ];
					}
				};
			}
		];	
	});
})