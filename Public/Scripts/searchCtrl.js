angular.module('toolshedApp')
	.controller('SearchCtrl', ['$scope', '$routeParams', '$location', 'UserService', 'DataService', function ($scope, $routeParams, $location, UserService, DataService) {

		/////////////////Page Load//////////////////
		
		$scope.types = DataService.type;
		$scope.sortMethods = {
			PROX: 'Proximity',
			RATING: 'Rating'
		};

		$scope.sortMethod = $scope.sortMethods.PROX;

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

		$scope.resultType = function (res) {
			return DataService.getType(res);
		};

		$scope.select = function (res) {
			$scope.curSelectedResult = res;
			$scope.sortMethod = $scope.sortMethods.PROX;
		};

		$scope.getSortedCurToolLocations = function () {
			return [{
				title: "Siebel Center",
				sortValue: 4,
				sortValueText: "4 miles"
			},
			{
				title: "Fab Lab",
				sortValue: 7,
				sortValueText: "7 miles"
			}];
		};

		$scope.getSortedCurSoftwareLocations = function () {
			return [{
				title: "Siebel Center",
				sortValue: 4,
				sortValueText: "4 miles"
			},
			{
				title: "Fab Lab",
				sortValue: 7,
				sortValueText: "7 miles"
			}];
		};

		$scope.curIsFavorite = function () {
			var isFav = false;
			for (i = 0; i < $scope.favorites.length; i++) {
				if ($scope.favorites[i] === $scope.curSelectedResult.title)
					isFav = true;
			}
			return isFav;
		};

		$scope.toggleFavorite = function () {
			if ($scope.curIsFavorite()) {
				$scope.favorites.splice($scope.favorites.indexOf($scope.curSelectedResult.title), 1);
				UserService.favorites.splice(UserService.favorites.indexOf($scope.curSelectedResult.title), 1);
			} else {
				$scope.favorites.push($scope.curSelectedResult.title);
				UserService.favorites.push($scope.curSelectedResult.title);
			}
		};

	}]);