
(function( ns ){

	var controller = ns.controller = ns.controller || {};
	
	controller.Destinations = function ( $scope, Airports ){
		var airport, prevListActive;

		// Shared Object
		angular.extend( $scope, {	
			airports: Airports.query(),
			
			listActive: {},
			
			setListActive: function( code ){
				console.log( "controller.Destinations.setListActive()" );
				
				var currentActive = code + "Active";
				
				if ( prevListActive ){
					$scope.listActive[ prevListActive ] = "";
				}
				$scope.listActive[ currentActive ] = "active";
				prevListActive = currentActive;
			},
			
			setAirport: function( code ){
				console.log( "controller.Destinations.setAirport()" );

				var i;

				for ( i = 0; i < $scope.airports.length; i++ ){
					if ( $scope.airports[ i ][ "code" ] === code ){
						$scope.currentAirport = $scope.airports[ i ];
						break;
					}
				}

				$scope.itemActive = "active";
			}
		});		
		
		$scope.setActiveMenu( "destinations" );	
	};

}( window.AL = window.AL || {} ));