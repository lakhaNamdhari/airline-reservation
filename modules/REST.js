
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


/**
*	Returned as node module.
*
*	@constructor
*/
var REST = function( attr, callback ){
	console.log( "REST()" );

	if ( attr ){
		// Enforcing the REST version of init should be called
		REST.prototype.init.call( this, attr, callback );
	}
};

/**
*	Initialises the REST service
*
*	@method init
*	@return {JSON}
*/
REST.prototype.init = function( attr, callback ){
	console.log( "REST.init()" );

	// Method to invoke on service
	var method, res;

	// Current request method GET / POST / DELETE
	this.reqMethod = attr.method = attr.method || "GET";

	// Cookie for current reuest
	this.cookie = attr.headers && attr.headers.cookie || "";
	
	// Headers for current request
	this.reqHeaders = attr.headers || {};

	// Request-method to service method mapping
	switch( attr.method ){
		case "GET":
			method = attr.args && attr.args.length === 1 ? config.method.findOne : config.method.find;
		break;

		case "POST":
			method = config.method.save;
		break;

		case "DELETE":
			method = config.method.remove;
		break;
	}

	// add mongo-db module
	try{
		this.mongodb = require( "./mongo-db.js" );
	}catch( err ){
		console.log( err );
		throw( "Couldn't locate mongo-db.js" );
	}

	// Return response back to server
	this[ method ].call( this, attr.args, callback );
}


/**
*	Finds all records in collection
*
*	@method find
*	@return {JSON}
*/
REST.prototype[ config.method.find ] = function( query, callback ){
	console.log( "REST." + config.method.find + "()" );

	if ( typeof query !== "object" ){
		query = null;
	}

	this.mongodb.find( query, this.collection, callback );
};


/**
*	Finds specific record in collection
*
*	@method findOne
*	@return {JSON}
*/
REST.prototype[ config.method.findOne ] = function( args, callback ){
	console.log( "REST." + config.method.findOne + "()" );

	var query = {};

	query[ this.queryKey ] = args.pop();

	this.find( query, function( err, data ){
		callback( err, data && data.pop() );
	});
};


/**
*	Removes a record from collection
*
*	@method remove
*	@return {JSON}
*/
REST.prototype[ config.method.remove ] = function(){
	console.log( "REST." + config.method.remove + "()" );
};


/**
*	Saves a record to collection
*
*	@method save
*	@return {JSON}
*/
REST.prototype[ config.method.save ] = function( args, callback ){
	console.log( "REST." + config.method.save + "()" );

	this.mongodb.save( this.collection, args.pop(), function( err, response ){
		callback( err, response && JSON.stringify( response ) );
	});
};

// Export as node module
module.exports = REST;