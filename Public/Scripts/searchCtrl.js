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
			if (query === $scope.searchInput)
				filterResults();
			else
				$location.path('search/' + query);
		};

		$scope.resultType = function (res) {
			return DataService.getType(res);
		};

		$scope.select = function (res) {
			$scope.curSelectedResult = res;
			$scope.sortMethod = $scope.sortMethodsDDL[0]
			$scope.commentForm = {
				body: "",
				rating: 3
			};

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
						var map = new google.maps.Map(document.getElementById("labMap"), myOptions);

						var marker = new google.maps.Marker({
							map: map,
							position: results[0].geometry.location
						});
					}
				});
			}
			else if (DataService.getType(res) === DataService.type.TOOL) {
				var geocoder = new google.maps.Geocoder();
				var bounds = new google.maps.LatLngBounds();
				var myOptions = {
					zoom: 15,
					center: new google.maps.LatLng(40.1020557, -88.222413)
				};
				var mapDiv = document.getElementById("toolMap");
				if (mapDiv !== null) {
					var map = new google.maps.Map(mapDiv, myOptions);

					for (var i = 0; i < res.labs.length; i++) {
						var labName = res.labs[i];
						var labAddress = DataService.getLab(labName).location;

						geocoder.geocode({
							'address': labAddress
						}, function (results, status) {
							if (status == google.maps.GeocoderStatus.OK) {
								var marker = new google.maps.Marker({
									map: map,
									position: results[0].geometry.location
								});

								bounds.extend(marker.getPosition());
								map.fitBounds(bounds);
							}
						});
					}
				}
			}
			else if (DataService.getType(res) === DataService.type.SOFTWARE) {
				var geocoder = new google.maps.Geocoder();
				var bounds = new google.maps.LatLngBounds();
				var myOptions = {
					zoom: 15,
					center: new google.maps.LatLng(40.1020557, -88.222413)
				};
				var mapDiv = document.getElementById("softMap");
				if (mapDiv !== null) {
					var map = new google.maps.Map(mapDiv, myOptions);

					for (var i = 0; i < res.labs.length; i++) {
						var labName = res.labs[i];
						var labAddress = DataService.getLab(labName).location;

						geocoder.geocode({
							'address': labAddress
						}, function (results, status) {
							if (status == google.maps.GeocoderStatus.OK) {
								var marker = new google.maps.Marker({
									map: map,
									position: results[0].geometry.location
								});

								bounds.extend(marker.getPosition());
								map.fitBounds(bounds);
							}
						});
					}
				}
			}
		};

		function equalData(newD, oldD) {
			if (oldD.length !== newD.length)
				return false;
			if (oldD.length === 0)
				return true;
			return oldD[0].sortValueText === newD[0].sortValueText;
		};

		function labSort(labA, labB) {
			return labA.sortValue - labB.sortValue;
		};

		var lastData = [];

		$scope.getSortedCurToolLocations = function (method) {
			var labs = $scope.curSelectedResult.labs;
			var data = [];
			for (var i = 0; i < labs.length; i++) {
				lab_data = DataService.getLab(labs[i]);
				var val = { title: lab_data.title };
				if (method.name === $scope.sortMethods.PROX) {
					val.sortValue = lab_data.distance;
					val.sortValueText = lab_data.distance + " miles";
				} else if (method.name === $scope.sortMethods.RATING) {
					var rating = DataService.getRating(lab_data);
					val.sortValue = rating;
					val.sortValueText = (rating == -1) ? "Unrated" : rating + " stars";
				}
				data.push(val);
			}
			data.sort(labSort);

			if (equalData(data, lastData))
				return lastData;

			lastData = data;
			return data;
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
				UserService.favorites.splice(UserService.favorites.indexOf($scope.curSelectedResult.title), 1);
			} else {
				UserService.favorites.push($scope.curSelectedResult.title);
			}
		};

		$scope.submitGuide = function() {
			$location.path('guide/' + $scope.curSelectedResult.title);
		};

		$scope.getRatingText = function (item) {
			return DataService.getRating(item);
		};

		$scope.getRatingText = function (item) {
			var rating = DataService.getRating(item);
			if (rating === -1)
				return "Unrated";
			else
				return rating.toFixed(1);
		};

		$scope.getGuideRatingText = function (guideName) {
			return $scope.getRatingText(DataService.getGuide(guideName));
		};

		$scope.getLabRatingText = function (labName) {
			return $scope.getRatingText(DataService.getLab(labName));
		};

		$scope.submitComment = function () {
			if ($scope.commentForm.body === "")
				return;

			var type = DataService.getType($scope.curSelectedResult);
			var comment = {
				user: UserService.username,
				rating: $scope.commentForm.rating,
				body: $scope.commentForm.body
			};
			if (type === DataService.type.LAB) {
				DataService.getLab($scope.curSelectedResult.title).comments.push(comment);
			} else if (type === DataService.type.GUIDE) {
				DataService.getGuide($scope.curSelectedResult.title).comments.push(comment);
			}
			$scope.commentForm = {
				body: "",
				rating: 3
			};
		};

		$scope.getSortingCategory = function (method) {
			if (method.name === $scope.sortMethods.PROX)
				return "Distance";
			else
				return "Rating";
		};

		//////////////////////////////////

		$scope.types = DataService.type;
		$scope.sortMethods = {
			PROX: 'Proximity',
			RATING: 'Rating'
		};

		$scope.sortMethodsDDL = [
			{ name: $scope.sortMethods.PROX },
			{ name: $scope.sortMethods.RATING }
		];

		$scope.sortMethod = $scope.sortMethodsDDL[0];

		$scope.searchInput = $routeParams.query;

		$scope.popularSearches = DataService.popular;
		$scope.favorites = UserService.favorites;

		$scope.commentForm = {
			body: "",
			rating: 3
		};

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