/**
*	Entry point for the booking module
*
*	@author Lakha Singh
*/
require.config({
	paths: {
		'booking.bookings': 'booking/bookings',
		'booking.flights': 'booking/flights'
	}
});

define([
	'booking.bookings',
	'booking.flights',
	'./cancel/main',
	'./new/main'
], function(){});