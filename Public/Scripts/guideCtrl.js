angular.module('toolshedApp')
	.controller('GuideCtrl', ['$scope', '$routeParams', '$location', 'UserService', 'DataService', function ($scope, $routeParams, $location, UserService, DataService) {

		$scope.guideTool = $routeParams.tool;

		$scope.formVals = {
			name: "",
			url: ""
		};

		$scope.submit = function () {
			if ($scope.formVals.url === "") {
				alert("You must include a URL");
			} else if ($scope.formVals.name === "") {
				alert("You must include a name");
			} else {
				var type = DataService.getType($scope.guideTool);
				if (type === DataService.type.TOOL) {
					DataService.getTool($scope.guideTool).guides.push($scope.formVals.name);
				} else if (type === DataService.type.SOFTWARE) {
					DataService.getSoftware($scope.guideTool).guides.push($scope.formVals.name);
				}
				DataService.guides.push({
					title: $scope.formVals.name,
					submitUser: UserService.username,
					submitDate: new Date(),
					url: $scope.formVals.url,
					tool: $scope.guideTool,
					comments: []
				});
				$location.path('search/' + $scope.formVals.name);
			}
		};

	}]);