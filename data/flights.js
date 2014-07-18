
/**
*	This is REST-ful service to get airports data
*
*	@author Lakha Singh
*	@class Flight
*/
var util = require( "util" );

// Base Class for Service
var Service;

try{
	Service = require( "../modules/service.js" );
}catch( err ){
	console.log( err );
	throw( "Couldn't locate service.js" );
}

/**
*	@constructor
*/
var Flight = function( attr ){
	console.log( "Flight()" );

	this.attr = attr;

	// Db-collection for airports data
	this.collection = "flights";
};

// Inherit REST interface
util.inherits( Flight, Service );

/**
*	Executes the service
*
*	@method exec
*/
Flight.prototype.exec = function( attr ){
	if ( attr || this.attr ){
		Flight.super_.call( this, attr || this.attr );
	}
}

/**
*	Fetches specific airports
*
*	@method find
*	@return {JSON}
*/
Flight.prototype.findOne = function( flightNumber ){
	console.log( "Flight.findOne()" );

	var query = { number: flightNumber };

	this.find( query );
}

/**
*	Exposed interface for this service
*
*	@method exec{object}
*/
Flight.create = function( attr ){
	console.log( "[ Static-Method ] Flight.create" );

	return new Flight( attr );
};

// Export as node Module
module.exports = {
	create: Flight.create
};  