angular.module('toolshedApp')
	.controller('HomeCtrl', ['$scope', '$location', 'UserService', 'DataService', function ($scope, $location, UserService, DataService) {

		//Page Load
		$scope.searchInput = '';

		$scope.popularSearches = DataService.popular;
		$scope.favorites = [];

		$scope.loggedIn = function () {
			return UserService.username !== "";
		};

		if ($scope.loggedIn()) {
			$scope.favorites = UserService.favorites;
		}

		//Events

		$scope.search = function () {
			$location.path('search/' + $scope.searchInput);
		};

		$scope.searchFor = function (query) {
			$location.path('search/' + query);
		};

	}]);