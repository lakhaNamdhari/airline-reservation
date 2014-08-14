;
(function( ns ){
	
	var controller = ns.controller;
	
	ns.router = function ( $routeProvider ){
		$routeProvider
			.when( "/", { templateUrl: "partials/reservations.html", controller: controller.Reservations } );
	};

	angular.module( "airline", ["ngRoute", "airlineServices"] )
			.config( ns.router )
			.filter('unique', function() {
			   return function(collection, keyname) {
				  var output = [], 
					  keys = [];

				  angular.forEach(collection, function(item) {
					  var key = item[keyname];
					  if(keys.indexOf(key) === -1) {
						  keys.push(key);
						  output.push(item);
					  }
				  });

				  return output;
			   };
			});

}( window.AL = window.AL || {} ));