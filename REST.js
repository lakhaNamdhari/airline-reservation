
/**
*	This node module implements REST mechanism. 
*	you can modify config to change REST interfaces or you can
*	write your own REST implementation similar to this one.
*	Inherit it to create REST-full services.
*
*	@author lakha Singh
*	@class REST
*/

// Module's config
var config = {
	method : {
		find : "find",
		findOne : "findOne",		
		remove : "remove",
		save : "save"
	}
};

var util = require( "util" );

var EventEmitter = require( "events" ).EventEmitter;

/**
*	Returned as node module.
*
*	@constructor
*/
var REST = function( attr ){
	console.log( "REST()" );

	if ( attr ){
		REST.prototype.init.call( this, attr);
	}
};


// Inherit REST interface
util.inherits( REST, EventEmitter );

/**
*	Initialises the REST service
*
*	@method init
*	@return {JSON}
*/
REST.prototype.init = function( attr ){
	console.log( "REST.init()" );

	// Method to invoke on service
	var method, res;

	// Current request method GET / POST / DELETE
	this.reqMethod = attr.method = attr.method || "GET";

	// Arguments with current request
	attr.args = attr.args || [];

	// Cookie for current reuest
	this.cookie = attr.headers && attr.headers.cookie || "";
	
	// Headers for current request
	this.reqHeaders = attr.headers || {};

	// Request-method to service method mapping
	switch( attr.method ){
		case "GET":
			method = attr.args.length ? config.method.findOne : config.method.find;
		break;

		case "POST":
			method = config.method.save;
		break;

		case "DELETE":
			method = config.method.remove;
		break;
	}

	// Return response back to server
	this[ method ].apply( this, attr.args );
}

/* Override these methods in your services */

/**
*	To find all entries in DB
*
*	@method find
*	@return {JSON}
*/
REST.prototype[ config.method.find ] = function(){
	console.log( "REST[ config.method.find ]()" );
};

/**
*	To find specific entry in DB
*
*	@method findOne
*	@return {JSON}
*/
REST.prototype[ config.method.findOne ] = function(){
	console.log( "REST[ config.method.find ]()" );
};

/**
*	To remove specific entry in DB
*
*	@method remove
*	@return {JSON}
*/
REST.prototype[ config.method.remove ] = function(){
	console.log( "REST[ config.method.find ]()" );
};

/**
*	To create / update entry in DB
*
*	@method save
*	@return {JSON}
*/
REST.prototype[ config.method.save ] = function(){
	console.log( "REST[ config.method.find ]()" );
};

// Export as node module
module.exports = REST;