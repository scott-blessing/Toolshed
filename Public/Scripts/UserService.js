angular.module('toolshedApp')
	.factory('UserService', function () {
		return {
			username: '',
			favorites: ['Siebel Center', 'Digital Computer Laboratory']
		};
	});