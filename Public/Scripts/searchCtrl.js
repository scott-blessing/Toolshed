angular.module('toolshedApp')
	.controller('SearchCtrl', ['$scope', '$routeParams', '$location', 'UserService', 'DataService', function ($scope, $routeParams, $location, UserService, DataService) {

		/////////////////Page Load//////////////////
		
		$scope.searchInput = $routeParams.query;
		$scope.results_labs = [];
		$scope.results_tools = [];
		$scope.results_software = [];
		$scope.results_guides = [];

		$scope.popularSearches = DataService.popular;
		$scope.favorites = [];

		//Load search results
		$scope.results_labs = DataService.labs;
		$scope.results_tools = DataService.tools;
		$scope.results_software = DataService.software;
		$scope.results_guides = DataService.guides;
		//TODO: Filter on search input
		//TODO: Special cases for all labs, all tools, all guides, etc.


		$scope.curSelectedResult = $scope.results_labs[0];
		//TODO: Select best match
		//TODO: Account for all empty arrays

		$scope.loggedIn = function () {
			return UserService.username !== "";
		};

		if ($scope.loggedIn()) {
			$scope.favorites = UserService.favorites;
		}

		///////////////////////Events/////////////////////
		$scope.search = function () {
			$location.path('search/' + $scope.searchInput);
		};

		$scope.searchFor = function (query) {
			$location.path('search/' + query);
		};

	}]);