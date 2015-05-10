define(function(require, exports, module) {
	var psd3 = require('./psd3');
	var dataGenerator = require('./data_generator');

	/*var data = {
		"B": [{
			"SUB_CLASS": "B60",
			"COUNT": 19621,
			"LABEL": "VEHICLES IN GENERAL"
		}, {
			"SUB_CLASS": "B61",
			"COUNT": 9268,
			"LABEL": "RAILWAYS"
		}, {
			"SUB_CLASS": "B62",
			"COUNT": 4019,
			"LABEL": "LAND VEHICLES FOR TRAVELLING OTHERWISE THAN ON RAILS"
		}, {
			"SUB_CLASS": "B65",
			"COUNT": 2241,
			"LABEL": "CONVEYING; PACKING; STORING; HANDLING THIN OR FILAMENTARY MATERIAL"
		}, {
			"SUB_CLASS": "B66",
			"COUNT": 2183,
			"LABEL": "HOISTING; LIFTING; HAULING"
		}, {
			"SUB_CLASS": "B01",
			"COUNT": 1764,
			"LABEL": "PHYSICAL OR CHEMICAL PROCESSES OR APPARATUS IN GENERAL"
		}, {
			"SUB_CLASS": "B32",
			"COUNT": 1666,
			"LABEL": "LAYERED PRODUCTS"
		}, {
			"SUB_CLASS": "B29",
			"COUNT": 1487,
			"LABEL": "WORKING OF PLASTICS; WORKING OF SUBSTANCES IN A PLASTIC STATE IN GENERAL"
		}],
		"G": [{
			"SUB_CLASS": "G06",
			"COUNT": 17509,
			"LABEL": "COMPUTING; CALCULATING; COUNTING"
		}, {
			"SUB_CLASS": "G01",
			"COUNT": 8247,
			"LABEL": "MEASURING; TESTING"
		}, {
			"SUB_CLASS": "G08",
			"COUNT": 4525,
			"LABEL": "SIGNALLING"
		}, {
			"SUB_CLASS": "G09",
			"COUNT": 4391,
			"LABEL": "EDUCATING; CRYPTOGRAPHY; DISPLAY; ADVERTISING; SEALS"
		}, {
			"SUB_CLASS": "G07",
			"COUNT": 2845,
			"LABEL": "CHECKING-DEVICES"
		}, {
			"SUB_CLASS": "G02",
			"COUNT": 2696,
			"LABEL": "OPTICS"
		}, {
			"SUB_CLASS": "G11",
			"COUNT": 1738,
			"LABEL": "INFORMATION STORAGE"
		}, {
			"SUB_CLASS": "G05",
			"COUNT": 1632,
			"LABEL": "CONTROLLING; REGULATING"
		}],
		"H": [{
			"SUB_CLASS": "H04",
			"COUNT": 12604,
			"LABEL": "ELECTRIC COMMUNICATION TECHNIQUE"
		}, {
			"SUB_CLASS": "H01",
			"COUNT": 7516,
			"LABEL": "BASIC ELECTRIC ELEMENTS"
		}, {
			"SUB_CLASS": "H02",
			"COUNT": 2743,
			"LABEL": "GENERATION, CONVERSION, OR DISTRIBUTION OF ELECTRIC POWER"
		}, {
			"SUB_CLASS": "H05",
			"COUNT": 1910,
			"LABEL": "H05"
		}],
		"A": [{
			"SUB_CLASS": "A61",
			"COUNT": 9067,
			"LABEL": "MEDICAL OR VETERINARY SCIENCE; HYGIENE"
		}, {
			"SUB_CLASS": "A63",
			"COUNT": 2822,
			"LABEL": "SPORTS; GAMES; AMUSEMENTS"
		}, {
			"SUB_CLASS": "A47",
			"COUNT": 2004,
			"LABEL": "FURNITURE; DOMESTIC ARTICLES OR APPLIANCES; COFFEE MILLS; SPICE MILLS; SUCTION CLEANERS IN GENERAL"
		}],
		"C": [{
			"SUB_CLASS": "C07",
			"COUNT": 6817,
			"LABEL": "ORGANIC CHEMISTRY [2]"
		}, {
			"SUB_CLASS": "C08",
			"COUNT": 2799,
			"LABEL": "ORGANIC MACROMOLECULAR COMPOUNDS; THEIR PREPARATION OR CHEMICAL WORKING-UP; COMPOSITIONS BASED THEREON"
		}, {
			"SUB_CLASS": "C12",
			"COUNT": 1917,
			"LABEL": "BIOCHEMISTRY; BEER; SPIRITS; WINE; VINEGAR; MICROBIOLOGY; ENZYMOLOGY; MUTATION OR GENETIC ENGINEERING"
		}, {
			"SUB_CLASS": "C09",
			"COUNT": 1879,
			"LABEL": "DYES; PAINTS; POLISHES; NATURAL RESINS; ADHESIVES; COMPOSITIONS NOT OTHERWISE PROVIDED FOR; APPLICATIONS OF MATERIALS NOT OTHERWISE PROVIDED FOR"
		}],
		"F": [{
			"SUB_CLASS": "F16",
			"COUNT": 4901,
			"LABEL": "ENGINEERING ELEMENTS OR UNITS; GENERAL MEASURES FOR PRODUCING AND MAINTAINING EFFECTIVE FUNCTIONING OF MACHINES OR INSTALLATIONS; THERMAL INSULATION IN GENERAL"
		}, {
			"SUB_CLASS": "F02",
			"COUNT": 2655,
			"LABEL": "COMBUSTION ENGINES; HOT-GAS OR COMBUSTION-PRODUCT ENGINE PLANTS"
		}],
		"E": [{
			"SUB_CLASS": "E05",
			"COUNT": 1561,
			"LABEL": "LOCKS; KEYS; WINDOW OR DOOR FITTINGS; SAFES"
		}]
	}

	console.log(d3.entries(data));*/

	//return;

	var chartService = psd3.chartService().options({
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
						sort: d3.ascending,
						padding: 0
						//rangeType: 'rangeBands'
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
					type: 'area',
					color: '#ff9995',
					typeOptions: {
						'interpolate': 'monotone'
					},
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
					type: 'area',
					color: '#82bfee',
					typeOptions: {
						'interpolate': 'monotone'
					},
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
		},
		tooltip: {
			//container: 'body',
			selector: '.scatter',
			eventType: 'mouseover', //invalid if type is "point_mouse"
			animation: true, //invalid if type is "point_mouse"
			type: 'horizontal', //'x', 'y', 'mouse'
			tpl: '{@each items as item, i}${item.key}: ${item.value} <br/>{@/each}',
			//tpl: '{key}: {value}', //for point_element
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

	chartService('#line-chart').then(function(chartEle) {
		console.log(chartEle);
	});
})