psd3.setOption({
	data: [{
		name: 'series0',
		data: [
			{id: 'dfed90', age: 0, score: 89, jioidj: 90, dhuiuhg:78, gguighg: 8, ggtwef: 8},
			{id: 'ejiodi78', age: 25, score: 15, jioidj: 90, dhuiuhg:78, gguighg: 8, ggtwef: 8},
			{id: 'ejiodi76', age: 25, score: 15, jioidj: 90, dhuiuhg:78, gguighg: 8, ggtwef: 8},
			{id: 'ejrdi78', age: 25, score: 15, jioidj: 90, dhuiuhg:78, gguighg: 8, ggtwef: 8},
			{id: 'tyiodi78', age: 25, score: 15, jioidj: 90, dhuiuhg:78, gguighg: 8, ggtwef: 8},
			{id: 'ioiodi78', age: 25, score: 15, jioidj: 90, dhuiuhg:78, gguighg: 8, ggtwef: 8},
			{id: 'rjiodi78', age: 25, score: 15, jioidj: 90, dhuiuhg:78, gguighg: 8, ggtwef: 8},
			{id: 'ajiodi78', age: 25, score: 15, jioidj: 90, dhuiuhg:78, gguighg: 8, ggtwef: 8},
			{id: 'bjiodi78', age: 25, score: 15, jioidj: 90, dhuiuhg:78, gguighg: 8, ggtwef: 8},
			{id: 'cjiodi78', age: 25, score: 15, jioidj: 90, dhuiuhg:78, gguighg: 8, ggtwef: 8},
			{id: 'djiodi78', age: 25, score: 15, jioidj: 90, dhuiuhg:78, gguighg: 8, ggtwef: 8},
			{id: 'fjiodi78', age: 25, score: 15, jioidj: 90, dhuiuhg:78, gguighg: 8, ggtwef: 8},
			{id: 'gjiodi78', age: 25, score: 15, jioidj: 90, dhuiuhg:78, gguighg: 8, ggtwef: 8},
			{id: 'hjiodi78', age: 25, score: 15, jioidj: 90, dhuiuhg:78, gguighg: 8, ggtwef: 8},
			{id: 'jjiodi78', age: 25, score: 15, jioidj: 90, dhuiuhg:78, gguighg: 8, ggtwef: 8},
			{id: 'kjiodi78', age: 25, score: 15, jioidj: 90, dhuiuhg:78, gguighg: 8, ggtwef: 8},
			{id: 'ljiodi78', age: 25, score: 15, jioidj: 90, dhuiuhg:78, gguighg: 8, ggtwef: 8},
			{id: 'mjiodi78', age: 25, score: 15, jioidj: 90, dhuiuhg:78, gguighg: 8, ggtwef: 8},
			{id: 'njiodi78', age: 25, score: 15, jioidj: 90, dhuiuhg:78, gguighg: 8, ggtwef: 8},
			{id: 'ojiodi78', age: 25, score: 15, jioidj: 90, dhuiuhg:78, gguighg: 8, ggtwef: 8}
		]
	}],
	selector: '#example',
	domType: 'div',
	layout: {
		width: 300,
		height: 300
	},
	colors: ['#f7d370','#f05c6c'],
	plot: {
		//domType: 'svg',
		//data: data, //rawdata
		series: [
			{
				type: 'table',
				style: {

				},
				height: 300,
				//valueRange: [0, 100],
				//colors: ['#f7d370','#f05c6c'],
				table: {
				},
				attributeId: 'id',
				columns: [
					{field: 'id', title:'id'},
					{
						field: 'score',
						title: 'score',
						formatter: function(d,  data) {
							console.log(this, data);
							return '<a href="#">' + d + '%' + '</a>';
						},
						postProcess: function(d) {
							d3.select(this).append('a');
							console.log(this, d);
						}
					},
					{field: 'age', title: 'age'},
					{field: 'jioidj', title: 'jioidj'},
					{field: 'dhuiuhg', title: 'dhuiuhg'},
					{field: 'gguighg', title: 'gguighg'},
					{field: 'ggtwef', title: 'ggtwef'}

				]
			}
		]
	}
});