define(function(require) {
	return {
		title: {},
		series: {
			bar:{},
			line:{},
			area:{},
			...
		},
		axis: {},
		tooltip: {},
		legend: {
			container: {
				fill: '#f3f3f3',
				padding: '10px 10px'
			},
			title: {
				'line-height': 1.5,
				'font-size': '16px',
				'font-weight': 'bold',
				'font-color': '#333'
			},
			item: {
				style: {
					'stroke-width': 2,
					'stroke': '#aaa',
					'line-height': 1.5,
					'font-size': '12px',
					'font-color': '#333'
					//'stroke-dasharray': '3,1'
				},
				marker: {
					type : 'circle',
					r: 4,
					style: {
						'stroke-width': 1,
						'stroke': '#fff'
					}
				}
			}
		}
	}
})