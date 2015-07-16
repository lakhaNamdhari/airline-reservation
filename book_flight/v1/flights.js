/**
*	This is REST-ful service to get flights data
*
*	@author Lakha Singh
*	@class Airport
*/
var util = require( "util" );

// REST module
var REST;

try{
	REST = require( "../../modules/REST.js" );
}catch( err ){
	console.log( err );
	throw( "Couldn't locate REST.js" );
}

/**
*	@constructor
*/
var Flight = function( attr, callback ){
	console.log( "Flight()" );

	// Db-collection for airports data
	this.collection = "flights";

	// Key used for findOne query
	this.queryKey = "number";

	// data-type for queryKey
	this.queryType = "number";

	if ( attr ){
		Flight.super_.call( this, attr, callback );
	}	
};

// Inherit REST interface
util.inherits( Flight, REST );

/**
*	Exposed interface for this service
*
*	@method exec{object}
*/
Flight.exec = function( attr, callback ){
	console.log( "Flight.exec" );

	new Flight( attr, callback );
};

// Export as node Module
module.exports = {
	exec: Flight.exec
};  


