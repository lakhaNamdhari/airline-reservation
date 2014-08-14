
/**
*	This extends server.js to process node based services
*
*	@author Lakha Singh
*/

var server = require( "./server.js" ).start( "localhost", 4500 );

var url = require( "url" );

//var qs = require( "querystring" );

var contentType;

var config = {
	serviceRoot: "./data/"
};

// Load Mime Types
try{
	contentType = require( "./mime-types.json" );
}catch( e ){
	util.log( e );
	throw( "ABORTING: Can't find dependency :: mime-types.json" );
}

/**
*	Parses request : Extracts requested URL and args
*
*	@method parseRequest
*/
var parseRequest = function( request, baseUrl, callback ){
	console.log( "parseRequest()" );

	var dataBody = '';

	var result = {};

	var helper;

	var requestUrl = url.parse( request.url );

	// For POST request
	if ( request.method === "POST" ){
		// Still receiving post data
		request.on( "data", function( data ){
			dataBody += data;

			// Kill connection if overloaded with data
			if ( dataBody.length > 1e6 ){
				request.connection.destroy();
			}
		});

		// When all post data recieved
		request.on( "end", function(){
			result.args = [ JSON.parse( dataBody ) ];
			result.url = baseUrl + requestUrl.pathname + ".js";

			callback( result );
		});
	}

	// For GET request
	else if ( request.method === "GET" ){
		helper = requestUrl.pathname.split( "/" );
		// Ignore the empty value
		helper.shift();
		result.url = baseUrl + helper.shift() + ".js";
		result.args = helper;

		callback( result );
	}
};

// When a service is hit
server.on( "service", function( request, response){
	console.log( "Server.on.service" );

	// Data to be sent with response
	var responseData;

	// Response mime-type
	var mimeType;

	// Service Instance
	var service;

	// Response status code
	var statusCode = 404;

	// Parses incoming request
	parseRequest( request, config.serviceRoot, function( data ){
		var params = {
			method : request.method,
			args : data.args,
			headers : request.headers
		};

		// try loading service
		try{
			service = require( data.url );
		}catch( e ){
			throw( e );
		}

		// Execute the service
		service.exec( params, function( err, data ){
			console.log( "service.complete()" );
			
			if ( err ){
				response.writeHead( statusCode );
				response.end();
			}

			mimeType = contentType[ "json" ];
			statusCode = 200;
			responseData = JSON.stringify( data );
		
			// Write back response
			response.writeHead( statusCode, { "content-type": mimeType });
			response.end( responseData );	 
		});
	});
});