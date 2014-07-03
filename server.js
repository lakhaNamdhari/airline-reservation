
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

// Dictionary to map services to actual URL's
var serviceMapper;


// Load Mime Types
try{
	contentType = require( "./mime-types.json" );
}catch( e ){
	util.log( e );
	throw( "ABORTING: Can't find dependency :: mime-types.json" );
}

try{
	serviceMapper = require( "./service-mapper.json" );
} catch( err ){
	util.log( e );
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
 			port: "3567",
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
 		extend( this.config, defaultConfig, config );

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
 				// If URL's for service doesn't exist quit
 				if ( !serviceMapper ){
	 				response.writeHead( statusCode );
	 				response.end();
	 			}

	 			else{
	 				var args = [];
	 				// Strip arguments from Url
	 				while ( !(requestUrl.pathname in serviceMapper) && requestUrl.pathname !== "" ){
	 					helper = requestUrl.pathname.split("/");
 						// Retrieve last value as argument to service
 						args.push( helper.pop() );
 						requestUrl.pathname = helper.join("/");
	 				}

	 				// Helper contains service extention
	 				helper = serviceMapper[ requestUrl.pathname ].split(".").pop();
	 				finalUrl = that.config.serviceRoot + serviceMapper[ requestUrl.pathname ];

	 				// Proces Node services
	 				if ( helper === "js" ){
	 					try{
	 						helper = require( finalUrl );
	 						responseData = helper({
		 						method : request.method,
		 						args : args,
		 						headers : request.headers
		 					});
	 						mimeType = contentType[ "json" ];
	 						statusCode = 200;
	 					}catch( err ){
	 						utl.log( err );
	 					}

	 					// Write back response
 						response.writeHead( statusCode, { "content-type": mimeType });
 						response.end( responseData );
	 				}

	 				// Can Extend it to support parsing php and JSP's at this point
	 				/*
	 				// If engine to process service is found in config, then procees
	 				if ( helper in that.config.REST.engine ){
	 					try{
	 						serviceEngine = require( that.config.REST.engine[ helper ] );
	 					} catch( err ){
			 				response.writeHead( statusCode );
			 				response.end();
	 					}

	 					responseData = serviceEngine.process( {
	 						method : request.method,
	 						args : args,
	 						headers : request.headers,
	 						url : finalUrl
	 					} );
	 					mimeType = contentType[ "json" ];

		 				// Return back resource
		 				response.writeHead( statusCode, { "content-type": mimeType });
		 				response.end( responseData );
	 				}
	 				*/
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