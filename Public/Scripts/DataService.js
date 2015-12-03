angular.module('toolshedApp')
	.factory('DataService', function () {
		return {
			labs: [
				{
					title: "Siebel Center"
				}],
			tools: [
				{
					title: "3D Printer",
				}],
			software: [
				{
					title: "AutoCAD 3D",
				}],
			guides: [
				{
					title: "3D Printing for Dmbasses",
				}],
			popular: ['3D Printer', 'Siebel Center', 'Fab Lab']
		};
	});