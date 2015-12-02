angular.module('toolshedApp')
	.factory('DataService', function () {
		return {
			data: [
				{
					title: "Siebel Center",
					type: 'lab'
				},
				{
					title: "3D Printer",
					type: 'tool'
				},
				{
					title: "AutoCAD 3D",
					type: 'soft'
				},
				{
					title: "3D Printing for Dmbasses",
					type: 'guide'
				}
			],
			type: {
				LAB: 'lab',
				TOOL: 'tool',
				SOFTWARE: 'soft',
				GUIDE: 'guide'
			}
		};
	});