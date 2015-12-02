angular.module('toolshedApp')
	.controller('HomeCtrl', ['$scope', '$location', 'UserService', function ($scope, $location, UserService) {

		//Page Load
		$scope.searchInput = '';


		//Events

		$scope.search = function () {
			$location.path('search/' + $scope.searchInput);
		};

	}]);