angular.module('toolshedApp', ['ngRoute'])
  .config(function ($routeProvider) {
  	$routeProvider
      .when('/', {
      	templateUrl: 'Views/home.html',
      	controller: 'HomeCtrl'
      })
			.when('/search/:query', {
				templateUrl: 'Views/search.html',
				controller: 'SearchCtrl'
			})
			.when('/report', {
				templateUrl: 'Views/report.html',
				controller: 'ReportCtrl'
			})
			.when('/guide/:tool', {
				templateUrl: 'Views/guide.html',
				controller: 'GuideCtrl'
			})
      .otherwise({
      	redirectTo: '/'
      })
  });

