
/**
 *	A node based Webserver that serves webpages.
 *	Its extensible to support node modules
 *
 *	@author: Lakha Singh
 *	@License: MIT
 */

var util = require( "util" );

var extend = require( "extend" );

var http = require( "http" );

var url = require( "url" );

var fs = require( "fs" );

var EventEmitter = require( "events" ).EventEmitter;

var contentType;

var services = [ "jsp", "php" ];

// Load Mime Types
try{
	contentType = require( "./mime-types.json" );
}catch( e ){
	util.log( e );
	throw( "ABORTING: Can't find dependency :: mime-types.json" );
}

var defaultConfig = {
	port: "3567",
	serviceRoot: "./data",
	resourceRoot: "./public",
	rootFile: "index.html",
	hostname: "localhost"
};
	
/**
*	@constructor
*/
function Server(){
	util.log( "Server()" );

	var config;

	if ( arguments.length === 1 ){
		config = typeof arguments[ 0 ] === "object" ? arguments[ 0 ] : {};
	}

	else if ( arguments.length === 2 ){
		config = {
			hostname: typeof arguments[ 0 ] === "string" ? arguments[ 0 ] : defaultConfig.hostname,
			port : typeof arguments[ 1 ] === "string" ? arguments[ 1 ] : defaultConfig.port
		};
	}

	extend( this.config = this.config || {}, defaultConfig, config || {} );

	// Start it
	if ( config ){
		this.init();
	}

}

// Makes our server capable of emitting events
util.inherits( Server, EventEmitter );

/**
*	Initiates the server
*
*	@method init
*	returns Object
*/
Server.prototype.init = function(){
	util.log( "Server.init()" );

 	// Server instance
 	this.server = http.createServer();

	// Binds Listeners
 	this.bindEvents();
 		
 	// Start Server
 	this.server.listen( this.config.port, this.config.hostname );

 	util.log( "Server started: " + this.config.hostname + ":" + this.config.port )
 	
 	// To support chaining
 	return this;
};

/**
*	Bind Events
*
*	@method bindEvents
*	@return Object
*/ 
Server.prototype.bindEvents = function(){
 	util.log( "Server.bindEvents" );

 	this.server.on( "request", this.hNewRequest() );

 	return this;
};

/**
*	Handler to serve a new connection
*
*	@method hNewRequest
*	@returns null
*/
Server.prototype.hNewRequest = function(){
	util.log( "Server.hNewRequest" );

	var that = this;

	return function( request, response ){
		// RAW url from request
		var requestUrl = url.parse( request.url );

		// For holding intermediate values
		var helper;

		// Content-type for response
		var mimeType;

		// Status of response
		var statusCode = 404;

		// Final URL mapped to a resource on the server
		var finalUrl;

		// data to be sent back as response
		var responseData;

		// Engine to process Service
		var serviceEngine;
			
		// Handle root file
		if ( requestUrl.pathname === "/" ){
			requestUrl.pathname += that.config.rootFile;
		}

		helper = requestUrl.pathname.split(".");

		// Serve Requested Resource
		if ( helper.length > 1 ){

			// Contains file extension
			helper = helper.pop();

			// If requested service
			if ( helper in services ){
				that.emit( "service", request, response );
				return true;
			}
			 
			finalUrl = that.config.resourceRoot + requestUrl.pathname;

			// Read File
			fs.readFile( finalUrl, function( err, data ){
				// If not Found
				if ( err ){
					statusCode = 404;
				}

				// If resource found
				else {
					statusCode = 200;
					// Set appropriate content-type
 				if ( helper in contentType ){
 					mimeType = contentType[ helper ];
 				}else {
 					mimeType = contentType[ "unknown" ];
 				}
 				responseData = data; 
				}

				// Return back resource
				response.writeHead( statusCode, { "content-type": mimeType });
				response.end( responseData );
			} );
		}

		// Serve Requested Service
		else {
			that.emit( "service", request, response );		
		} // ends: Requested service else here
	} // ends: request handler anonomous function 	
};

/**
*	Stops Server
*
*	@method bindEvents
*	@return Object
*/ 
Server.prototype.stop = function(){
 	util.log( "Server.stop" );

 	return this;
};

/**
*	Exposed interface for this Module
*
*	@method start{object}
*/
Server.start = function( arg1, arg2 ){
	console.log( "[ Static-Method ] Server.start()" );

	return new Server( arg1, arg2 );
}

// Expose Class
 module.exports = {
 	// Creates and returns new server instance
 	start: Server.start
 };