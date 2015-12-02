angular.module('toolshedApp')
	.controller('HeaderCtrl', ['$scope', 'UserService', function ($scope, UserService) {

	//Init
	$scope.username = UserService.username;


	//Events
	$scope.login = function () {
		var name = prompt("Please pretend you've actually been redirected to the UIUC Shibboleth page to login.  Netid:");
		if (name == null || name == "")
			return;
		UserService.username = name;
		$scope.username = name;
	};

	$scope.logout = function () {
		UserService.username = "";
		$scope.username = "";
	};

	$scope.loggedIn = function () {
		return $scope.username !== "";
	};

}]);