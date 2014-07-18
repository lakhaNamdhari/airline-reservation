
/**
*	This is REST-ful service to get airports data
*
*	@author Lakha Singh
*	@class Airport
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
var Airport = function( attr ){
	console.log( "Airport()" );

	this.attr = attr;

	// Db-collection for airports data
	this.collection = "airports";
};

// Inherit REST interface
util.inherits( Airport, Service );

/**
*	Executes the service
*
*	@method exec
*/
Airport.prototype.exec = function( attr ){
	if ( attr || this.attr ){
		Airport.super_.call( this, attr || this.attr );
	}
}

/**
*	Fetches specific airports
*
*	@method find
*	@return {JSON}
*/
Airport.prototype.findOne = function( airportId ){
	console.log( "Airport.findOne()" );

	var query = { code: airportId };

	this.find( query );
}

/**
*	Exposed interface for this service
*
*	@method exec{object}
*/
Airport.create = function( attr ){
	console.log( "[ Static-Method ] Airport.create" );

	return new Airport( attr );
};

// Export as node Module
module.exports = {
	create: Airport.create
};  