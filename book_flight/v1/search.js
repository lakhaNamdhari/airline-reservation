
/**
*	This is REST-ful service to search flights
*
*	@author Lakha Singh
*	@class Search
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
var Search = function( attr, callback ){
	console.log( "Search()" );

	// Db-collection for airports data
	this.collection = "flights";

	// Key used for findOne query
	this.queryKey = "number";

	if ( attr ){
		Search.super_.call( this, attr, callback );
	}	
};

// Inherit REST interface
util.inherits( Search, REST );

/**
*	Finds all records in collection
*
*	@method find
*	@return {JSON}
*/
Search.prototype.find = function( attr, callback ){
	console.log( "Search.find()" );

	var query;

	if ( attr.length === 2 ){
		query = {
			origin: attr.shift(),
			destination: attr.shift()
		};
	}

	Search.super_.prototype.find.call( this, query, callback )
};

/**
*	Exposed interface for this service
*
*	@method exec{object}
*/
Search.exec = function( attr, callback ){
	console.log( "Search.exec" );

	return new Search( attr, callback );
};

// Export as node Module
module.exports = {
	exec: Search.exec
};  