
/**
*	This is REST-ful service to get airports data
*
*	@author Lakha Singh
*	@class Airport
*/
var util = require( "util" );

var airportsData = require( "./airportsNew.json" );

// Base Service class
var Service = require( "../service.js" );

//var mongo = require( "mongodb" ).MongoClient;

/**
*	@constructor
*/
var Airport = function( attr ){
	console.log( "Airport()" );

	if ( attr ){
		Airport.super_.call( this, attr );
	}
};

// Inherit Base Service Class
util.inherits( Airport, Service );

/**
*	Fetches all available airports
*
*	@method find
*	@return {JSON}
*/
Airport.prototype.find = function(){
	console.log( "Airport.find()" );

	return JSON.stringify( airportsData );
}

/**
*	Fetches specific airports
*
*	@method find
*	@return {JSON}
*/
Airport.prototype.findOne = function( airportId ){
	console.log( "Airport.findOne()" );

	var airport = {}, i;

	for ( i = 0; i < airportsData.length; i++ ){
		if ( airportsData[ i ][ "code" ] === airportId ){
			airport = airportsData[ i ];
			break;
		}
	}
	return JSON.stringify( airport );
}

/**
*	Exposed interface for this service
*
*	@method exec{object}
*/
Airport.exec = function( attr ){
	console.log( "Airport.exec" );

	new Airport( attr );
};

// Export as node Module
module.exports = {
	exec: Airport.exec
};