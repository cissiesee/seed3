define(function(require) {
	return {
		data: [{
			"name": 'series0',
			"data": {
				"name": "flare",
				"children": [
					{
						"name": "analytics",
						"children": [
					 		{
								"name": "cluster",
								"children": [
									{"name": "AgglomerativeCluster", "size": 3938},
									{"name": "CommunityStructure", "size": 3812},
									{"name": "MergeEdge", "size": 743}
								]
							},
							{
								"name": "graph",
								"children": [
									{"name": "BetweennessCentrality", "size": 3534},
									{"name": "LinkDistance", "size": 5731}
								]
							}
						]
					}
				]
			}
		}],
		config: {

		},
		/*colors: {
			"A" : "#609900",
			"B" : "#479A8F",
			"C" : "#8E60AB",
			"D" : "#9D9071",
			"E" : "#A97148",
			"F" : "#2267AD",
			"G" : "#4F4F4F",
			"H" : "#CC6161"
		},*/ // {key: color}
		colors: ['#609900','#479A8F','#8E60AB','#9D9071','#A97148'],
		domType: 'div',
		layout: {
			width: 500,
			height: 500
		},
		/*legend: {
			//domType: 'svg',
			toggleClass: 'selected',
			//position: 'right',
			data: ['A', 'B', 'C'],
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
					left: 10,
					top: 10,
					//colors: '#ff9995',
					style: {
						'word-wrap': 'nowrap',
						'text-overflow': 'ellipsis'
					},
					label: {
						position: 'outer_top', //outer_left, outer_bottom, outer_right, inner_top, inner_bottom, center, [position]
						format: function(d) {

						}
					},
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
			selector: '.leaf-node',
			eventType: 'mouseover', //invalid if type is "point_mouse"
			animation: true, //invalid if type is "point_mouse"
			type: 'point_mouse', //'x', 'y', 'mouse'
			tpl: '{name}: <br/> {value}',
			/*tpl: function(d, callback) { //'{name}: <br/> {value}'
				setTimeout(function() {
					d.id = d.name + 1;
					callback('{id} <br/> {value}');
				}, Math.round(1000 + Math.random() * (3000 - 1000)));
			},*/
			//orient: 'right',
			offset: 20
		}
	}
})