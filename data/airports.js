
/**
*	This is REST-ful service to get airports data
*
*	@author Lakha Singh
*	@class Airport
*/
var util = require( "util" );

var airportsData = require( "./airportsNew.json" );

var REST = require( "../REST.js" );

//var mongo = require( "mongodb" ).MongoClient;

/**
*	@constructor
*/
var Airport = function( attr ){
	console.log( "Airport()" );

	this.attr = attr;
};

// Inherit REST interface
util.inherits( Airport, REST );

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
*	Fetches all available airports
*
*	@method find
*	@return {JSON}
*/
Airport.prototype.find = function(){
	console.log( "Airport.find()" );

	var err;

	this.emit( "complete", err, JSON.stringify( airportsData ) );
}

/**
*	Fetches specific airports
*
*	@method find
*	@return {JSON}
*/
Airport.prototype.findOne = function( airportId ){
	console.log( "Airport.findOne()" );

	var airport = {}, i, err;

	for ( i = 0; i < airportsData.length; i++ ){
		if ( airportsData[ i ][ "code" ] === airportId ){
			airport = airportsData[ i ];
			break;
		}
	}

	this.emit( "complete", err, JSON.stringify( airport ) );
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