define(function(require) {
	return {
		data: dataGenerator('cube', {
			max: 100,
			min: 0,
			seriesNum: 2,
			nodesNum: 6
		}),
		domType: 'svg',
		layout: {
			width: 1000,
			height: 500
		},
		config: {
			'x': 'key',
			'y': 'value'
		},
		legend: {
			//domType: 'svg',
			toggleClass: 'selected',
			//position: 'right',
			eventType: 'click',
			column: 1,
			marker: {
				width: 16,
				height: 16
			},
			layout: {
				width: 200,
				height: 200,
				margin: {
					top: 10,
					right: 0,
					bottom: 0,
					left: 460
				},
				padding: {
					top: 20,
					right: 0,
					bottom: 0,
					left: 30
				}
			},
			style: {
				container: {
					'fill': '#f7f7f7'
				},
				text: {
					'font-size': '13px',
					'font-weight': 'bold',
					'color': '#666',
					'line-height': 1.5
				}
			}
		},
		plot: {
			//domType: 'svg',
			//data: data, //rawdata
			layout: {left: 50, top: 10, width: 400, height: 400},
			axis: {
				type: 'rectangle', //polar
				grid: { //true
					style: {
						'fill': '#f3f3f3',
						'stroke': '#ccc'
					}
				},
				data: [{
					type: 'category',
					key: 'x',
					title: {content: 'key', position: 'out'},
					show: {
						ticks: 10,
						tickSize: 6,
						tickLine: true,
						stripeBg: false
					},
					scale: {
						sort: d3.ascending
					}
				},{
					type: 'value',
					key: 'y',
					title: {content: 'value', position: 'out'},
					show: {
						//orient: 'right',
						ticks: 10,
						tickSize: 6,
						tickLine: true,
						stripeBg: false
					},
					scale: {
						sort: d3.ascending
					}
				}]
			},
			series: [
				{
					name: 'series0',
					label: 'series 0',
					type: 'line',
					color: '#ff9995',
					stack: 'g1',
					style: {
						'stroke-width': 2,
						'stroke-dasharray': '5,3'
					},
					marker: {
						type : 'circle',
						r: 4,
						style: {
							fill: '#fff',
							//stroke: '#fff',
							'stroke-dasharray': 'none'
						}
					},
					label: {
						position: 'outer_top', //outer_left, outer_bottom, outer_right, inner_top, inner_bottom, center, [position]
						format: function(d) {

						}
					},
					markLine: [{
						value: 'max',
						text: '',
						style: {}
					},{
						value: 'min',
						style: {}
					}, {
						value: 'average',
						style: {}
					}, {
						value1: 56,
						value2: 78,
						style: {}
					}],
					markPoint: [{
						key: 'key1',
						value: 78,
						style: {}
					}]
				},
				{
					name: 'series1',
					label: 'series 1',
					stack: 'g1',
					type: 'line',
					color: '#82bfee',
					style: {
						'stroke-width': 2,
						'stroke-dasharray': '0,0'
					},
					marker: {
						type : 'circle',
						r: 4,
						style: {
							//fill: '#777',
							stroke: '#fff'
						}
					},
					label: {
						position: 'outer_top', //outer_left, outer_bottom, outer_right, inner_top, inner_bottom, center, [position]
						format: function(d) {

						}
					},
					markLine: [{
						value: 'max',
						text: '',
						style: {}
					},{
						value: 'min',
						style: {}
					}, {
						value: 'average',
						style: {}
					}, {
						value1: 56,
						value2: 78,
						style: {}
					}],
					markPoint: [{
						key: 'key1',
						value: 78,
						style: {}
					}]
				}
			]
		}
	}
})