
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

	if ( attr ){
		Flight.super_.call( this, attr, callback );
	}	
};

// Inherit REST interface
util.inherits( Flight, REST );

/**
*	Finds all records in collection
*
*	@method find
*	@return {JSON}
*/
Flight.prototype.find = function( attr, callback ){
	console.log( "Flight.find()" );

	var query;

	if ( attr.length === 2 ){
		query = {
			origin: attr.shift(),
			destination: attr.shift()
		};
	}

	Flight.super_.prototype.find.call( this, query, callback )
};

/**
*	Exposed interface for this service
*
*	@method exec{object}
*/
Flight.exec = function( attr, callback ){
	console.log( "Flight.exec" );

	return new Flight( attr, callback );
};

// Export as node Module
module.exports = {
	exec: Flight.exec
};  