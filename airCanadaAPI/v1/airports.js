
/**
*	This is REST-ful service to get airports data
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
var Airport = function( attr, callback ){
	console.log( "Airport()" );

	// Db-collection for airports data
	this.collection = "airports";

	// Key used for findOne query
	this.queryKey = "code";

	if ( attr ){
		Airport.super_.call( this, attr, callback );
	}	
};

// Inherit REST interface
util.inherits( Airport, REST );

/**
*	Exposed interface for this service
*
*	@method exec{object}
*/
Airport.exec = function( attr, callback ){
	console.log( "Airport.exec" );

	new Airport( attr, callback );
};

// Export as node Module
module.exports = {
	exec: Airport.exec
};  