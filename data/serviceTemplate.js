
/**
*	This is REST-ful service to get some data
*
*	@author Lakha Singh
*	@class Airport
*/

// Rest interface
var REST = require( "../REST.js" );

var util = require( "util" );

var airportsData = require( "./airports.json" );

/**
*	Here attr is passed by server, it has following attributes
*
*	attr.method -> Request-method ( GET / POST)
*	attr.args -> any arguments passed for service
*	attr.headers -> Request-headers
*
*	@constructor
*/
var DemoService = function( attr ){
	console.log( "DemoService()" );

	// Self instatiating pattern
	if ( !( this instanceof DemoService) ){
		return new DemoService( attr );
	}

	/**
	*	Calls REST class's constructor
	*	It adds following attributes to instance
	*
	*	reqMethod -> attr.method 
	*	args -> attr.args
	*	cookie -> cookie value
	*	reqHeaders -> attr.headers
	*/
	if ( attr ){
		// Self instatiating pattern
		if ( !( this instanceof DemoService) ){
			return DemoService.super_.call( new DemoService(), attr );
		}

		return DemoService.super_.call( this, attr );
	}
};

// Inherit REST interface
util.inherits( DemoService, REST );

/**
*	Method description
*
*	@method find
*	@return {JSON}
*/
DemoService.prototype.find = function(){
	console.log( "DemoService.find()" );

	return JSON.stringify( airportsData );
}

// Export as node Module
module.exports = DemoService;