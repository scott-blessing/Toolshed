angular.module('toolshedApp')
	.controller('HomeCtrl', ['$scope', 'UserService', function ($scope, UserService) {

		//Page Load
		$scope.searchInput = '';


		//Events

		$scope.search = function () {
			$scope.searchInput += "test";
		};

	}]);