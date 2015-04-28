chart: {
	data: d,
	domType: 'svg',
	theme: { //type
		title: {},
		plot: {
			bar:{},
			line:{},
			area:{},
			...
		},
		tooltip: {},
		legend: {}
	},
	title: {
		main: 'chart title',
		sub: 'jidosid',
		align: 'center',
		style: {
			main: {},
			sub: {}
		}
	},
	layout: {
		width: 1000,
		height: 500
	},
	plot: {
		domType: 'svg',
		data: data, //rawdata
		layout: {},
		axis: {
			type: 'rectangle', //polar
			x: {
				type: 'category',
				key: 'key1',
				title: {content: 'key 1', position: 'in/out/[]'},
				show: true,
				sort: d3.ascending,//function() {}
				//scaleType: 'ordinal',
				//round: true,
				//nice: true,
				//domain: function(xs) {},
				//range: function(ys) {},
				//pointType: 'point', //band,
				//padding: 1,
				//outerPadding: 0
				scale: function(d) {//customize
					return d3.scale.ordinal();
				},
				drawer: function(scale) { //customize
					return function(container) {
						container.append('g');
						container.append('g');
						//...
					}
				}; [{
					ticks: 10,
					tickSize: 6,
					orient: 'top',
					style: {

					}
				}];
			},
			y: {},
			grid: { //true
				style: {}
			}
		},
		series: [
			{
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
					style: {
						r: 4,
						fill: '#ccc'
					}
				},
				showNumber: 'top', //left, bottom, right, center, [position]
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
					value2: 78
					style: {}
				}],
				markPoint: [{
					key: 'key1',
					value: 78,
					style: {}
				}]
			}
		],
		events: {
			'.bar:click': [fn,fn],
			'.bar:mouseover': [fn, fn],
			'complete': [fn,fn]
		}
	},
	legend: {
		domType: 'svg',
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
			container: {
				'fill': '#ccc'
			},
			text: {
				'font-size': '16px',
				'font-weight': 'bold'
			}
		},
		on: function(type, callback) {} //click, mouseover
	},
	tooltip: {
		selector: '.marker', 
		eventType: 'mouseover', 
		animation: true,
		type: 'point_element', //'x', 'y', 'mouse'
		//todo each
		orient: 'right',
		offset: 20,
		adaptive: true, //adapt tooltip's position
		onUpdate: function(tooltip, d) {
			//console.log(tooltip, d);
		}	
	},
	onComplete: function() {}
}

theme: {
	title: {},
	plot: {
		bar:{},
		line:{},
		area:{},
		...
	},
	tooltip: {},
	legend: {}
}

plot: {
	data: data, //rawdata
	layout: {},
	axis: { //adapter data according to axis config and distribute to series service, define scale and axis ruler
		type: 'rectangle', //polar
		grid: { //true
			style: {}
		},
		data: [{
			key: 'x', // required
			dataKey: 'key1', //required, generate axis data from tablet data
			values: [],
			title: 'title x',
			type: 'category', //required, decide the default config and choose the scale opts automaticly, priority: thirdly
			show: [{ //ruler customize
				ticks: 10,
				tickSize: 6,
				tickLine: true,
				stripeBg: false,
				orient: 'top',
				tickLabels: function(labels) {
					return labels.push('89');
				},
				style: {

				},
				position: {value: 0},
				generator: function(scale) { //customize, default: true
					return function(container) {
						container.append('g');
						container.append('g');
						//...
					}
				}
			}],
			scale: { //scale customize
				sort: d3.ascending,//function() {}
				scaleType: 'ordinal',
				round: true,
				nice: true,
				domain: function(xs) {},
				rangeType: 'rangeRoundBands',
				range: function(ys) {},
				pointType: 'point', //band,
				padding: 1,
				outerPadding: 0, //above, priority: secondly
				generator: function(d) {//customize, priority: important
					return d3.scale.ordinal();
				}
			}
		}, {
			key: 'y',
			dataKey: 'value'
		}]
	},
	series: [
		{
			name: 'series0',
			type: 'radar',
			style: {
				'fill': '#ccc',
				'stroke-width': 2,
				'stroke': '#aaa',
				'stroke-dasharray': '3,1'
			},
			marker: {
				type : 'circle',
				style: {
					r: 4,
					fill: '#ccc'
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
			}, {
				value: 'min',
				style: {}
			}, {
				value: 'average',
				style: {}
			}, {
				value1: 56,
				value2: 78
				style: {}
			}],
			markPoint: [{
				key: 'key1',
				value: 78,
				style: {}
			}],
			data:[{node: {x:, y:, style: {}, marker: {}, markerPoint: {}}, originalData...]//merge with style
		}
	],
	events: {
		'.bar:click': [fn,fn],
		'.bar:mouseover': [fn, fn],
		'complete': [fn,fn]
	}
}

scale: {
	type: 'rectangle',
	layout: {},
	scales: [{
		key:'x',
		values:[],
		scaleType: 'ordinal',
		domain: null,
		range: null,
		rangeType: 'rangePoints', //band
		range: null,
		padding: 1,
		outerPadding: 0
	}]
}

axis: {
	type: 'rectangle',
	grid: {}, //true
	scales: scales,
	axes: [{ //ruler customize
		key: 'x', // required
		dataKey: 'key1', //required, generate axis data from tablet data
		title: 'title x',
		type: 'category', //required, decide the default config and choose the scale opts automaticly, priority: thirdly
		ticks: 10,
		tickSize: 6,
		tickLine: true,
		stripeBg: false,
		orient: 'top',
		tickLabels: function(labels) {
			return labels.push('89');
		},
		format: function() {},
		style: {

		},
		position: {value: 0},
		generator: function(scale) { //customize, default: true
			return function(container) {
				container.append('g');
				container.append('g');
				//...
			}
		}
	}]
}

series: {
	data: [{
		name: 'series1',
		data: ...
	}],
	scales: scales,
	container: container,
	seriesWidthRatio: 0.8
}

legend: {
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

tooltip: {
	container: 'body',
	selector: '.marker', 
	eventType: 'mouseover', 
	animation: true,
	type: 'point_element', //'x', 'y', 'mouse'
	//todo each
	orient: 'right',
	offset: 20,
	adaptive: true, //adapt tooltip's position
	css: '',
	onUpdate: function(tooltip, d) {
		//console.log(tooltip, d);
	}	
}