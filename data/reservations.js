
/**
*	This is REST-ful service to get airports data
*
*	@author Lakha Singh
*	@class Flight
*/
var util = require( "util" );

// REST module
var REST;

try{
	REST = require( "../modules/REST.js" );
}catch( err ){
	console.log( err );
	throw( "Couldn't locate REST.js" );
}

/**
*	@constructor
*/
var Reservation = function( attr, callback ){
	console.log( "Reservation()" );

	// Db-collection for airports data
	this.collection = "reservations";

	// Key used for findOne query
	this.queryKey = "id";

	if ( attr ){
		Reservation.super_.call( this, attr, callback );
	}	
};

// Inherit REST interface
util.inherits( Reservation, REST );

/**
*	Exposed interface for this service
*
*	@method exec{object}
*/
Reservation.exec = function( attr, callback ){
	console.log( "Reservation.exec" );

	return new Reservation( attr, callback );
};

// Export as node Module
module.exports = {
	exec: Reservation.exec
};  