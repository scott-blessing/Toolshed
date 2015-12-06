angular.module('toolshedApp')
	.factory('DataService', function () {

		var factory = {};

		factory.labs = [
			{
				title: "Siebel Center",
				location: "201 N Goodwin Ave, Urbana IL 61801",
				labs: ["0403", "0221", "0220", "0222", "0225"],
				tools: ["3D Printer", "AutoCAD 3D"],
				comments: [
					{
						user: "abjrekn2",
						rating: 3.7,
						body: "Siebel is the best"
					},
					{
						user: "uyeouiu3",
						rating: 2.1,
						body: "I stepped in gum so I blame the building"
					}
				]
			}
		];

		factory.tools = [
			{
				title: "3D Printer",
				desc: "A printer that prints in 3D using the latest molten plastic technology",
				labs: ["Siebel Center"],
				guides: ["3D Printing for Dummies"]
			}
		];

		factory.software = [
			{
				title: "AutoCAD 3D",
				desc: "3D modeling software commonly used in Architectural and Mechanical engineering contexts",
				labs: ["Siebel Center"],
				guides: []
			}
		];

		factory.guides = [
			{
				title: "3D Printing for Dummies",
				submitUser: "blessin2",
				submitDate: new Date(2015, 8, 11),
				url: "https://futura.com/3d%20printing%20tutorial",
				comments: [
					{
						user: "gglolgtg3",
						rating: 4.9,
						body: "Best 3D printing tutorial on the internet by far"
					},
					{
						user: "mmojrpg1",
						rating: 3.6,
						body: "My girlfriend broke up with me while I was reading this."
					}
				]
			}
		];

		factory.type = {
			LAB: 'lab',
			TOOL: 'tool',
			SOFTWARE: 'soft',
			GUIDE: 'guide'
		};

		factory.popular = ['3D Printer', 'Siebel Center', 'Fab Lab'];

		function itemInArray(item, arr) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].title === item.title) return true;
			}
		};

		factory.getType = function (item) {
			if (itemInArray(item, factory.labs))
				return factory.type.LAB;
			if (itemInArray(item, factory.tools))
				return factory.type.TOOL;
			if (itemInArray(item, factory.software))
				return factory.type.SOFTWARE;
			if (itemInArray(item, factory.guides))
				return factory.type.GUIDE;
			return '';
		};

		factory.getLab = function (title) {
			for (var i = 0; i < factory.labs.length; i++) {
				if (factory.labs[i].title === title)
					return factory.labs[i];
			}
		};

		factory.getTool = function (title) {
			for (var i = 0; i < factory.tools.length; i++) {
				if (factory.tools[i].title === title)
					return factory.tools[i];
			}
		};

		factory.getSoftware = function (title) {
			for (var i = 0; i < factory.software.length; i++) {
				if (factory.software[i].title === title)
					return factory.software[i];
			}
		};

		factory.getGuide = function (title) {
			for (var i = 0; i < factory.guides.length; i++) {
				if (factory.guides[i].title === title)
					return factory.guides[i];
			}
		};

		return factory;
	});