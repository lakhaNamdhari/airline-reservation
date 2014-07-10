
(function( ns ){

	var controller = ns.controller = ns.controller || {};
	
	controller.Airport = function ( $scope, $routeParams, Airports ){
		$scope.currentAirport = Airports.get({ 
			airportCode: $routeParams.airportCode
		});
	};

}( window.AL = window.AL || {} ));