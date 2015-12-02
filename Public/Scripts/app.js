angular.module('toolshedApp', ['ngRoute'])
  .config(function ($routeProvider) {
  	$routeProvider
      .when('/', {
      	templateUrl: 'Views/home.html',
      	controller: 'HomeCtrl'
      })
			.when('/search', {
				templateUrl: 'Views/search.html',
				controller: 'SearchCtrl'
			})
      .otherwise({
      	redirectTo: '/'
      })
  });

