psd3.setOption({
	data: [{
		name: 'series0',
		data: [
			{id: 'dfed90', name: 'cissie', sex: 'female', age: 30},
			{id: 'ejiodi78', name: 'jack', sex: 'male', age: 25},
			{id: 'deged', name: 'lily', sex: 'female', age: 15},
			{id: 'dete', name: 'lucy', sex: 'female', age: 16},
			{id: 'kuyyj', name: 'mike', sex: 'male', age: 36},
			{id: '46hfgs', name: 'jassie', sex: 'female', age: 35},
			{id: 'fh365456', name: 'miumiu', sex: 'male', age: 1},
			{id: 'fhf4567', name: 'lucky', sex: 'male', age: 35}
		]
	}],
	selector: '#example',
	domType: 'div',
	layout: {
		width: 500,
		height: 500
	},
	colors: ['#f7d370','#f05c6c'],
	plot: {
		//domType: 'svg',
		//data: data, //rawdata
		layout: {left: 50, top: 10, width: 400, height: 400},
		series: [
			{
				type: 'table',
				style: {

				},
				height: 300,
				colors: ['#f7d370','#f05c6c'],
				attributeId: 'id',
				valueKey: 'age',
				columns: [{field: 'id', title:'id'},{field: 'name', title: 'name'},{field: 'age', title: 'age'}]
			}
		]
	}
});