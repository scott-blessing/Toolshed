angular.module('toolshedApp')
	.factory('UserService', function () {
		return {
			username: '',
			favorites: ['Everett', 'MatLab']
		};
	});