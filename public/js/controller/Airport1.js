
(function( ns ){

	var controller = ns.controller = ns.controller || {};
	
	controller.Airport1 = function ( $scope, $routeParams ){

		$scope.currentAirport = $scope.airports[ $routeParams.airport1 ];
	};

}( window.AL = window.AL || {} ));