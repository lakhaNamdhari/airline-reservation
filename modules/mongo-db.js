
/**
*	Provides driver independent way of accessing mongodb
*
*	@author Lakha Singh
*/

// Holds database connection info
var dbConfig = {
	hostname: "localhost",
	port: 27017,
	database: "aircanada"
};

// Client to connect to mongo-db
var mongodb;

// Database instance
var db;

// Flag to represent database conntection state
var connected = false;

//
var connecting = false;

var reqQue = [];

try{
	mongodb = require( "mongodb" );
}catch( err ){
	console.log( err );
	throw( "mongodb node module not found. please use 'npm install -g mongodb'" );
}

//mongoClient = new mongodb.MongoClient( new mongodb.Server( dbConfig.hostname, dbConfig.port ), {native_parser: true});
db = new mongodb.Db( dbConfig.database, new mongodb.Server( dbConfig.hostname, dbConfig.port ));

// Private functions
var fn = {
	// Connects to collection asynchronously
	connect: function( collection, callback ){
		console.log( "mongodb.fn.connect" );

		var helper;

		// If opening a DB Connection, push requests in Queue
		if ( connecting ){
			reqQue.push( {collection: collection, callback: callback} );
		}

		// If Not connected or connecting to DB, start a connection
		else if ( !connected && !connecting ){
			connecting = true;
			db.open(function( err, database ){
				connecting = false;
				connected = true;

				if ( err ){
					callback( err );
				} else{
					database.collection( collection, callback );	
				}	

				// process pending requests, if any
				while ( reqQue.length ){
					helper = reqQue.shift();

					if ( err ){
						helper.callback( err );
					}else{
						database.collection( helper.collection , helper.callback );	
					}
				}
			});
		}

		// If DB connection is open
		else if ( connected ){			
			db.collection( collection, callback );		
		}
	}
};

var mongoDb = {
	find: function( collection, query, callback ){
		console.log( "mongodb.find" );

		fn.connect( collection, function( err, lCollection ){
			if ( err ){
				callback( err );
			} else{
				lCollection
					.find( query )
					.toArray( callback );	
			}	
		});
	},

	save: function( collection, data, callback ){
		console.log( "mongodb.insert" );

		fn.connect( collection, function( err, lCollection ){
			if ( err ){
				callback( err );
			} else{
				lCollection.save( data, callback );	
			}	
		});
	},

	remove: function( collection, query, callback ){
		console.log( "mongodb.delete" );

		fn.connect( collection, function( err, lCollection ){
			if ( err ){
				callback( err );
			} else{
				lCollection.remove( query, callback );	
			}	
		});
	}
};

module.exports = mongoDb;
