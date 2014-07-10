
/**
*	This is REST-ful service to get airports data
*
*	@author Lakha Singh
*	@class Airport
*/

// Rest interface
var REST = require( "./REST.js" );

var util = require( "util" );

/**
*	@constructor
*/
var Service = function( attr ){
	console.log( "Service()" );

	this.attr = attr;
};

// Inherit EventEmitter
util.inherits( Service, REST );

/**
*	Executes the service
*
*	@method exec
*/
Service.prototype.exec = function( attr ){
	if ( attr || this.attr ){
		Airport.super_.call( this, attr || this.attr );
	}
};

/**
*	Fetches all available Data
*
*	@method find
*	@return {JSON}
*/
Service.prototype.find = function(){
	console.log( "Service.find()" );

	var err, data;

	/* Logic goes here*/

	this.emit( "complete", err, JSON.stringify( data ) );
};

/**
*	Exposed interface for this service - creates service instance
*
*	@method exec{object}
*/
Service.create = function( attr ){
	console.log( "[ Static-Method ] Service.create" );

	return new Service( attr );
};

// Export as node Class
module.exports = {
	create: Service.create
};