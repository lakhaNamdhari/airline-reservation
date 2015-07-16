/**
*	Interface is a service used for inter-module communication
*
*	@author Lakha Singh
*/
define([
	'core/module'
], function( core ){
	core.factory( "core.Interface", [
		function (){
			return {
				// Stores the array of all bookings by user
				booking: null,

				// stores array of all airports
				airports: null

				// stores array of all flights
				flights: null
			};
		}
	]);	
});
