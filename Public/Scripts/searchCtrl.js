angular.module('toolshedApp')
	.controller('SearchCtrl', ['$scope', '$routeParams', '$location', 'UserService', 'DataService', function ($scope, $routeParams, $location, UserService, DataService) {

		/////////////////Page Load//////////////////
		
		$scope.searchInput = $routeParams.query;
		$scope.results = [];

		//Load search results
		$scope.results = DataService.data;
		//TODO: Filter on search input
		//TODO: Special cases for all labs, all tools, all guides, etc.



		///////////////////////Events/////////////////////
		$scope.search = function () {
			$location.path('search/' + $scope.searchInput);
		};

		$scope.getResTypeStyle = function (resItem) {
			if (resItem.type === DataService.type.LAB)
				return "{'background-color': 'red'}";
			if (resItem.type === DataService.type.TOOL)
				return "{'background-color': 'blue'}";
			if (resItem.type === DataService.type.SOFTWARE)
				return "{'background-color': 'green'}";
			if (resItem.type === DataService.type.GUIDE)
				return "{'background-color': 'purple'}";
			return "{'background-color': 'white'}";
		};

	}]);