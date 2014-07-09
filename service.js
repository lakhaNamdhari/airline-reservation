
/**
*	This is REST-ful service to get airports data
*
*	@author Lakha Singh
*	@class Airport
*/

// Rest interface
var REST = require( "../REST.js" );

var util = require( "util" );

var EventEmitter = require( "events" ).EventEmitter;

/**
*	@constructor
*/
var Service = function( attr ){
	console.log( "Service()" );

	if ( attr ){
		Service.super_.call( this, attr );
	}
};

/**
*	Inheritance pattern is very important here as every inheritance
*	will override Class.super_ variable
*/
// Inherit EventEmitter
util.inherits( Service , EventEmitter );

// Inherit REST interface
util.inherits( Service, REST );

/**
*	A static method that should be exposed by all services.
*	module.exports = { exec: Service.exec }
*
*	@method exec
*/
Service.exec = function( attr ){
	console.log( "Service.exec" );
	new Service( attr );
}

// Export as node Class
module.exports = Service;