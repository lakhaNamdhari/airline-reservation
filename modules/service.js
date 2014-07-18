
/**
*	This is a Base Service class. All services must inherit it.
*
*	@author Lakha Singh
*	@class Service
*/
var util = require( "util" );

// The REST functionality
var REST = require( "./REST.js" );

/**
*	@constructor
*/
var Service = function( attr ){
	console.log( "Service()" );
	
	// mongo-db refernce
	try{
		this.mongodb = require( "./mongo-db.js" );
	}catch( err ){
		console.log( err );
		throw( "Couldn't locate mongo-db.js" );
	}

	if ( attr ){
		Service.super_.call( this, attr );
	}
};

// Inherit REST interface
util.inherits( Service, REST );

/**
*	Fetches all available data
*
*	@method find
*	@return {JSON}
*/
Service.prototype.find = function( query ){
	console.log( "Service.find()" );

	var err, that = this;

	this.mongodb.find( query, this.collection, function( err, data ){
		that.emit( "complete", err, data && JSON.stringify( query && data.pop() || data ) || "" );
	});	
};

module.exports = Service;
 