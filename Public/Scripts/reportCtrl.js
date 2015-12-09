angular.module('toolshedApp')
	.controller('ReportCtrl', ['$scope', '$routeParams', '$location', 'UserService', 'DataService', function ($scope, $routeParams, $location, UserService, DataService) {

		$scope.submitted = false;

		$scope.submit = function () {
			$scope.submitted = true;
		};

		$scope.returnHome = function () {
			$location.path('');
		};

	}]);