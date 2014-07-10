
/**
*	This extends server.js to process node based services
*
*	@author Lakha Singh
*/

var server = require( "./server.js" ).start( "localhost", 4500 );

var url = require( "url" );

var contentType;

var config = {
	serviceRoot: "./data"
};

// Load Mime Types
try{
	contentType = require( "./mime-types.json" );
}catch( e ){
	util.log( e );
	throw( "ABORTING: Can't find dependency :: mime-types.json" );
}

// When a service is hit
server.on( "service", function( request, response){
	console.log( "Server.on.service" );

	var responseData;

	var requestUrl = url.parse( request.url );

	var args = [];

	var helper;

	var mimeType;

	var service;

	var statusCode = 404;

	var pending = true;

	while( pending && requestUrl.pathname !== "" ){
		try{	 		
			// Assume service to be a node module
			// Not supporting php, JSP modules as if now	 			
			finalUrl = config.serviceRoot + requestUrl.pathname + ".js";

			// Creates service instance
			service = require( finalUrl ).create();

			// When service is executed
			service.on( "complete", function( err, data ){
				console.log( "service.complete()" );
				
				// If service successfull
				if ( data ){
					mimeType = contentType[ "json" ];
					statusCode = 200;
					responseData = data;
				}

				// Write back response
				response.writeHead( statusCode, { "content-type": mimeType });
				response.end( responseData );	 
			});

			// Execute the service
			service.exec({
				method : request.method,
				args : args,
				headers : request.headers
			});

			// Break the loop
			pending = false;
		}catch( err ){
			helper = requestUrl.pathname.split( "/" );
			args.push( helper.pop() );
			requestUrl.pathname = helper.join( "/" );
		}
	} 
	
	// If service not found
	if ( pending ){
		response.writeHead( statusCode );
		response.end();
	}

});