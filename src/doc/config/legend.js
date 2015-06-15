{
	data: [{
		name: 'series1',
		label: 'series 1',
		type: 'line',
		style: {
			'fill': '#ccc',
			'stroke-width': 2,
			'stroke': '#aaa',
			'stroke-dasharray': '3,1'
		},
		marker: {
			type : 'circle',
			r: 4,
			width: 16,
			height: 16,
			style: {
				fill: '#ccc'
			}
		}
	}],
	domType: 'svg',
	container: 'body', //selector or d3ele
	toggleClass: 'selected',
	//position: 'right',
	eventType: 'click',
	column: 1,
	layout: {
		width: 200,
		height: 200,
		margin: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 15
		},
		padding: {
			top: 20,
			right: 0,
			bottom: 0,
			left: 30
		}
	},
	style: {
		'background': '#f3f3f3',
		'font-size': '16px',
		'font-weight': 'bold'
	},
	on: function(type, callback) {} //click, mouseover
}