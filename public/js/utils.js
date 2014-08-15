
/**
*	Module containing helper functions
*
*	@author Lakha Singh
*/
(function( ns ){
	// Utlilities Namespace
	var util = ns.util = ns.util || {};

	/**
	*	Function to enable console logs based on debug flag.
	*	Logs are disabled by default, but can be enabled for dev env
	*	
	*	@method log
	*/
	util.log = function( text ){
		if ( typeof util.log.debug === "boolean" && util.log.debug ){
			console.log( text );
		}
	}

	// Set true to enable logs
	util.log.debug = true;
}( window.NS = window.NS || {} ));

