
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
	

function Server( config ){
	util.log( "Server()" );

	// Execute module if called as function
	if ( !( this instanceof Server) ){
		return ( new Server() ).start();
	}

	this.config = config || {};
}

Server.prototype = {
 	// init execution sequence
 	start: function(){
 		util.log( "Server.start()" );

 		var config;

 		var defaultConfig = {
 			port: "4000",
 			serviceRoot: "./data",
 			resourceRoot: "./public",
 			rootFile: "index.html",
 			hostName: "localhost"
 		};

 		try {
 			config = require( "./server-config.json" );
 		} catch( e ){
 			config = {};
 		}

 		// Final Server config
 		extend( this.config, config, defaultConfig );

 		// Server instance
 		this.server = http.createServer();

 		// Binds Listeners
 		this.bindEvents();
 		
 		// Start Server
 		this.server.listen( this.config.port, this.config.hostName );

 		util.log( "Server started: " + this.config.hostName + ":" + this.config.port )
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

 			// For holding intermediate
 			var helper;

 			// Content-type for response
 			var mimeType;

 			// Status of response
 			var statusCode = 404;

 			// Flag to indicate status of reading Service
			var pending;

			// Final URL mapped to a resource on the server
			var finalUrl;

			// data to be sent back as response
			var responseData;

			// Currently only supporting service with one argument
			var argument;
 			
			// Handle root file
			if ( requestUrl.pathname === "/" ){
				requestUrl.pathname += that.config.rootFile;
			}

 			helper = requestUrl.pathname.split(".");

 			// Requested Resource
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
		 					mimeType = contentType[ "unknown" ]
		 				}
		 				responseData = data; 
	 				}

	 				// Return back resource
	 				response.writeHead( statusCode, { "content-type": mimeType });
	 				response.end( responseData );
 				} );
 			}

 			// Requested Service
 			else {
				pending = true;
 				finalUrl = that.config.serviceRoot + requestUrl.pathname +  ".js";

 				// Only supporting Node services at this point
 				while( pending ){
 					try{
 						// Helper contains service
 						helper = require( finalUrl );
 						pending = false;
 						statusCode = 200;
 						mimeType = contentType[ "json" ];
 					}catch( err ){
 						helper = requestUrl.pathname.split("/");
 						// Retrieve last value as argument to service
 						argument = helper.pop();

 						// Reconstruct URL
 						finalUrl = that.config.serviceRoot + helper.join("/") +  ".js";
 					}
 				}

 				// When service is fetched i.e pending = false
 				if ( !pending ){
 					if ( argument ){
 						responseData = helper.findOne( argument );
 					}else{
 						responseData = helper.find();
 					}

 					// Return back data
	 				response.writeHead( statusCode, { "content-type": mimeType });
	 				response.end( responseData );
	 			}
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