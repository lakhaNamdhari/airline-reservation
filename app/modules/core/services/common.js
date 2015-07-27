/**
*	common methods
*
*	@author Lakha Singh
*/
define([
	'core/module',
	'./airports'
], function( module ){
	module.factory( "core.Common", [
		'core.Airports',
		'$log',
		'$location',
		function ( Airports, $log, $location ){
			return {
				// adds active class nav menu based on url
				activateNav: function( page ){
					$log.debug( "core.services.Common.activateNav" );

					var url = $location.path().substring(1);
					var result = '', i;

					// to prevent always true empty string comparisons
					url = url == '' ? 'root' : url;

					// Detect array
					if ( typeof page == 'object' && page.length ){
						for ( i = 0; i < page.length; i++ ){
							if ( typeof page[i] == 'object' && page[i].test == 'contains' ){
								result = url.indexOf( page[i].text ) > -1 ? 'active' : '';
							}else{
								result = url == page[i] ? 'active' : '';
							}
							if ( result == 'active' ){
								break;
							}
						}
					}else{
						if ( typeof page == 'object' && page.test == 'contains' ){
							result = url.indexOf( page.text ) > -1 ? 'active' : '';
						}else{
							result = url == page ? 'active' : '';
						}
					}

					return result;
				}
			}
		}		
	]);
});
