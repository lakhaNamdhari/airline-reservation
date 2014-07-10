
(function( ns ){

	var controller = ns.controller = ns.controller || {};
	
	controller.Airport2 = function ( $scope, $routeParams ){

		$scope.currentAirport = $scope.airports[ $routeParams.airport2 ];
	};

}( window.AL = window.AL || {} ));