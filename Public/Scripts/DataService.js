angular.module('toolshedApp')
	.factory('DataService', function () {

		var factory = {};

		factory.labs = [
			{
				title: "Siebel Center",
				location: "201 N Goodwin Ave, Urbana IL 61801",
				distance: 7.2,
				labs: ["0403", "0221", "0220", "0222", "0225"],
				tools: ["3D Printer", "AutoCAD 3D","Matlab"],
				comments: [
					{
						user: "abjrekn2",
						rating: 4,
						body: "Siebel is the best"
					},
					{
						user: "uyeouiu3",
						rating: 2,
						body: "I stepped in gum so I blame the building"
					}
				]
			},
			{
				title: "ECE Building",
				location: "306 N Wright St, Urbana, IL 61801",
				distance: 3.4,
				labs:["2001","0101","0202","0420"],
				tools:["3D Printer","Oscilloscope"],
				comments: [
				{
						user: "abjrekn2",
						rating: 4,
						body: "Siebel is the best"
					},
					{
						user: "uyeouiu3",
						rating: 2,
						body: "ECE > Siebel"
					}

				]
			},
			{
				title: "Digital Computer Laboratory",
				location: "1304 W. Springfield, Urbana, IL 61801",
				distance: 1.9,
				labs:["2201","0201","0203","0420"],
				tools:["Matlab"],
				comments: [
				{
						user: "abjrekn2",
						rating: 3,
						body: "DCL sux"
					},
					{
						user: "uyeouiu3",
						rating: 2,
						body: "ECE For Lyf"
					}

				]
			},
			{
				title: "Fab Labs",
				location: "1301 S Goodwin Ave, Urbana, IL 61801",
				distance: 3.2,
				labs:["Fab Labs"],
				tools:["3D Printer","Sewing Machine","Laser Printer"],
				comments: [
				{
						user: "abjrekn2",
						rating: 5,
						body: "DCL sux"
					},
					{
						user: "uyeouiu3",
						rating: 1,
						body: "ECE For Lyf"
					}

				]
			}

		];

		factory.tools = [
			{
				title: "Oscilloscope",
				desc: "Measures wave frequencies",
				labs: ["Siebel Center","ECE Building"],
				guides: []
			},
			{
				title: "3D Printer",
				desc: "A printer that prints in 3D using the latest molten plastic technology",
				labs: ["Siebel Center"],
				guides: ["3D Printing for Dummies", "Advanced 3D Printing Techniques"]
			},
			{
				title: "Sewing Machine",
				desc: "Ask your mom",
				labs: ["Fab Labs"],
				guides: ["Yo Moma's guide to Sewing"]
			},
			{
				title: "Laser Printer",
				desc: "Not for children",
				labs: ["Fab Labs"],
				guides: ["Laser Tag for Adult"]
			}

		];

		factory.software = [
			{
				title: "AutoCAD 3D",
				desc: "3D modeling software commonly used in Architectural and Mechanical engineering contexts",
				labs: ["Siebel Center"],
				guides: []
			},
			{
				title: "Matlab",
				desc: "The worlds greatest IDE ever. Really.",
				labs: ["Siebel Center","Digital Computer Laboratory"],
				guides: []
			}
		];

		factory.guides = [
			{
				title: "3D Printing for Dummies",
				submitUser: "blessin2",
				submitDate: new Date(2015, 8, 11),
				url: "https://futura.com/3d%20printing%20tutorial",
				tool: "3D Printer",
				comments: [
					{
						user: "gglolgtg3",
						rating: 5,
						body: "Best 3D printing tutorial on the internet by far"
					},
					{
						user: "mmojrpg1",
						rating: 3,
						body: "My girlfriend broke up with me while I was reading this."
					}
				]
			},
			{
				title: "Yo Moma's guide to Sewing",
				submitUser: "blessin2",
				submitDate: new Date(2015, 8, 11),
				tool: "Sewing Machine",
				url: "https://http://www.amazon.com/Sewing-For-Dummies-Saunders-Maresh/dp/0470623209",
				comments: [
					{
						user: "gglolgtg3",
						rating: 4,
						body: "Good stuff"
					},
					{
						user: "mmojrpg1",
						rating: 3,
						body: "Real good"
					}
				]
			},
			{
				title: "Laser Tag for Adult",
				submitUser: "blessin2",
				submitDate: new Date(2015, 8, 11),
				tool: "Laser Printer",
				url: "https://s-media-cache-ak0.pinimg.com/236x/b1/81/ff/b181ffe4a1cc4a011599444fbd94ae59.jpg",
				comments: [
					{
						user: "gglolgtg3",
						rating: 4,
						body: "Good stuff"
					},
					{
						user: "mmojrpg1",
						rating: 3,
						body: "Real good"
					}
				]
			},
			{
				title: "Advanced 3D Printing Techniques",
				submitUser: "blessin2",
				submitDate: new Date(2015, 8, 11),
				tool: "3D Printer",
				url: "https://s-media-cache-ak0.pinimg.com/236x/b1/81/ff/b181ffe4a1cc4a011599444fbd94ae59.jpg",
				comments: [
					{
						user: "gglolgtg3",
						rating: 1,
						body: "Pure drivel - nothing about this guide is advanced"
					},
					{
						user: "mmojrpg1",
						rating: 2,
						body: "Incredibly pretentious sounding narrator"
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

		factory.popular = ['3D Printer', 'Siebel Center', 'Fab Labs'];

		function itemInArray(item, arr) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].title === item.title) return true;
			}
		};

		factory.getType = function (item) {
			if (item === null)
				return '';

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

		factory.getRating = function (item) {
			if (!('comments' in item))
				return -1;
			var comments = item.comments;
			var sum = 0;
			for (var i = 0; i < comments.length; i++) {
				var c = comments[i];
				sum += c.rating;
			}
			return (sum / comments.length);
		};

		return factory;
	});