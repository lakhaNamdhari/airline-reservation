
/*
 * @description: A node based Webserver
 * @author: Lakha Singh
 * @License: MIT
 *
 ****************************************/

var util = require( "util" );

var extend = require( "extend" );

var http = require( "http" );

var url = require( "url" );

var fs = require( "fs" );

var contentType;

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

	// Execute module if called as function
	if ( !( this instanceof Server) ){
		return ( new Server( config ) ).start();
	}



	extend( this.config = this.config || {}, defaultConfig, config || {} );
}

Server.prototype = {
 	// init execution sequence
 	start: function(){
 		util.log( "Server.start()" );

 		// Server instance
 		this.server = http.createServer();

 		// Binds Listeners
 		this.bindEvents();
 		
 		// Start Server
 		this.server.listen( this.config.port, this.config.hostname );

 		util.log( "Server started: " + this.config.hostname + ":" + this.config.port )
 		// To support chaining
 		return this;
 	},

 	bindEvents: function(){
 		util.log( "Server.bindEvents" );

 		this.server.on( "request", this.hNewRequest() ); 		
 	},

 	hNewRequest: function(){
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
				var args = [];

	 			while( !responseData || (!responseData && requestUrl.pathname !== "") ){
	 				try{	 		
	 					// Assume service to be a node module
	 					// Not supporting php, JSP modules as if now	 			
	 					finalUrl = that.config.serviceRoot + requestUrl.pathname + ".js";

	 					helper = require( finalUrl );
	 					responseData = helper({
		 					method : request.method,
		 					args : args,
		 					headers : request.headers
		 				});
		 				mimeType = contentType[ "json" ];
	 					statusCode = 200;
	 				}catch( err ){
	 					helper = requestUrl.pathname.split( "/" );
	 					args.push( helper.pop() );
	 					requestUrl.pathname = helper.join( "/" );
	 				}
	 			}

	 			// Write back response
 				response.writeHead( statusCode, { "content-type": mimeType });
 				response.end( responseData );	 			
 			} // ends: Requested service else here
 		} // ends: request handler anonomous function 
 	},

 	// Stops the server
 	stop: function(){
 		util.log( "Server.stop()" );
 	}
};

// Expose Class
 module.exports = Server;