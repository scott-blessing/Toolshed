angular.module('toolshedApp')
	.controller('SearchCtrl', ['$scope', '$routeParams', '$location', 'UserService', 'DataService', function ($scope, $routeParams, $location, UserService, DataService) {

		$scope.loggedIn = function () {
			return UserService.username !== "";
		};

		if ($scope.loggedIn()) {
			$scope.favorites = UserService.favorites;
		}

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

			if (DataService.getType(res) === DataService.type.LAB) {
				geocoder = new google.maps.Geocoder();
				geocoder.geocode({
					'address': res.location
				}, function (results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						var myOptions = {
							zoom: 15,
							center: results[0].geometry.location
						}
						map = new google.maps.Map(document.getElementById("labMap"), myOptions);

						var marker = new google.maps.Marker({
							map: map,
							position: results[0].geometry.location
						});
					}
				});
			}
		};

		$scope.getSortedCurToolLocations = function () {
			return [{
				title: "Siebel Center",
				sortValue: 4,
				sortValueText: "4 miles"
			},
			{
				title: "Fab Labs",
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
				title: "Fab Labs",
				sortValue: 7,
				sortValueText: "7 miles"
			}];
		};

		$scope.curIsFavorite = function () {
			for (var i = 0; i < $scope.favorites.length; i++) {
				if ($scope.favorites[i] === $scope.curSelectedResult.title) {
					return true;
				}
			}
			return false;
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




		//////////////////////////////////


		$scope.types = DataService.type;
		$scope.sortMethods = {
			PROX: 'Proximity',
			RATING: 'Rating'
		};

		$scope.sortMethod = $scope.sortMethods.PROX;

		$scope.searchInput = $routeParams.query;

		$scope.popularSearches = DataService.popular;
		$scope.favorites = UserService.favorites;

		//Load search results
		$scope.results_labs = DataService.labs;
		$scope.results_tools = DataService.tools;
		$scope.results_software = DataService.software;
		$scope.results_guides = DataService.guides;
		//TODO: Filter on search input

		$scope.curSelectedResult = null;

		function filterResults() {
			if ($scope.searchInput === "labs") {
				$scope.results_tools = [];
				$scope.results_software = [];
				$scope.results_guides = [];
			}
			if ($scope.searchInput === "tools") {
				$scope.results_labs = [];
				$scope.results_software = [];
				$scope.results_guides = [];
			}
			if ($scope.searchInput === "software") {
				$scope.results_labs = [];
				$scope.results_tools = [];
				$scope.results_guides = [];
			}
			if ($scope.searchInput === "guides") {
				$scope.results_labs = [];
				$scope.results_tools = [];
				$scope.results_software = [];
			}

			for (var i = 0; i < $scope.results_labs.length; i++) {
				if ($scope.searchInput === $scope.results_labs[i].title)
					$scope.select($scope.results_labs[i]);
			}
			for (var i = 0; i < $scope.results_tools.length; i++) {
				if ($scope.searchInput === $scope.results_tools[i].title)
					$scope.select($scope.results_tools[i]);
			}
			for (var i = 0; i < $scope.results_software.length; i++) {
				if ($scope.searchInput === $scope.results_software[i].title)
					$scope.select($scope.results_software[i]);
			}
			for (var i = 0; i < $scope.results_guides.length; i++) {
				if ($scope.searchInput === $scope.results_guides[i].title)
					$scope.select($scope.results_guides[i]);
			}
		};

		filterResults();


	}]);