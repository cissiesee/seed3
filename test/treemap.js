psd3.setOption({
	selector: '#example',
	data: [{
		"name": 'series0',
		"data": {
			"name": "ipc",
			"children": [
				{
					"name": "G",
					"children": [
						{
						    "name": "G06F",
						    "desc": "electric digital data processing ",
						    "value": 77986.0
						},
						{
						    "name": "G11B",
						    "desc": "information storage based on relative movement between record carrier and transducer ",
						    "value": 8066.0
						},
						{
						    "name": "G11C",
						    "desc": "static stores ",
						    "value": 5856.0
						},
						{
						    "name": "G06K",
						    "desc": "recognition of data; presentation of data; record carriers; handling record carriers ",
						    "value": 4656.0
						},
						{
						    "name": "G06Q",
						    "desc": "data processing for administrative, commercial, financial, managerial or forecasting purposes",
						    "value": 6400.0
						},
						{
						    "name": "G01R",
						    "desc": "measuring electric variables",
						    "value": 3943.0
						}
					]
				},
				{
					"name": "H",
					"children": [
						{
						    "name": "H01L",
						    "desc": "semiconductor devices; electric solid state devices",
						    "value": 24911.0
						}, 
						{
						    "name": "H04L",
						    "desc": "transmission of digital information",
						    "value": 15304.0
						}, 
						{
						    "name": "H05K",
						    "desc": "printed circuits; casings or constructional details of electric apparatus",
						    "value": 6236.0
						}, 
						{
						    "name": "H03K",
						    "desc": "pulse technique  ",
						    "value": 4209.0
						}
					]
				}
			]
		}
	}],
	config: {

	},
	colors: {
		"A" : "#609900",
		"B" : "#479A8F",
		"C" : "#8E60AB",
		"D" : "#9D9071",
		"E" : "#A97148",
		"F" : "#2267AD",
		"G" : "#4F4F4F",
		"H" : "#CC6161"
	},
	domType: 'div',
	layout: {
		width: 400,
		height: 400
	},
	/*legend: {
		//domType: 'svg',
		toggleClass: 'selected',
		//position: 'right',
		data: ['G', 'H'],
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
				'background': '#f7f7f7'
			},
			text: {
				'font-size': '13px',
				'font-weight': 'bold',
				'color': '#666',
				'line-height': 1.5
			}
		}
	},*/
	plot: {
		//domType: 'svg',
		//data: data, //rawdata
		//layout: {left: 50, top: 10, width: 400, height: 400},
		series: [
			{
				name: 'series0',
				label: 'series 0',
				type: 'treemap',
				width: 400,
				height: 400,
				//colors: '#ff9995',
				style: {
					'word-wrap': 'nowrap',
					'text-overflow': 'ellipsis',
					'font-size': '12px',
					'color': '#fff'
				}
			}
		]
	},
	tooltip: {
		//container: 'body',
		selector: '.leaf-node',
		eventType: 'mouseover', //invalid if type is "point_mouse"
		animation: true, //invalid if type is "point_mouse"
		type: 'point_mouse', //'x', 'y', 'mouse'
		tpl: '${name}: <br/> ${value}',
		/*tpl: function(d, callback) { //'{name}: <br/> {value}'
			setTimeout(function() {
				d.id = d.name + 1;
				callback('{id} <br/> {value}');
			}, Math.round(1000 + Math.random() * (3000 - 1000)));
		},*/
		//orient: 'right',
		offset: 20
	}
});