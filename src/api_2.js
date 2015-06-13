var components = {
	axis: {
	},
	series: {
		type: 
	},
	legend: {
		
	},
	tooltip: {
		
	},
	brush: {
		
	},
	zoom: {
		
	},
	theme: {
		
	}
};

/**/
method:
getOption: {
	axis: {
		type: 'rectangle' //'polar'
		grid: {
			x: true,
			y: false,
			style: {

			}
		},
		axes: [
			{
				key: 'x', //'y', 'a,b,c,d,e,f...' for polar
				dataKey: '',
				type: 'category', //'value'
				data: [],
				title: 'axis x',
				titleLocation: 'start', //'end', 'middle'
				style: {

				},
				hoverStyle: {

				}
			}
		]
	},
	series: {
		type: 'line', //'pie'-->rectangle/polar
		data: {}, //rawdata,
		keyMap: { //for non-axis
			name: 'key',
			value: 'value'
		},
		seriesOpts...,
		style: {

		},
		hoverStyle: {

		}
	},
	tooltip: {

	},
	legend: {

	},
	zoom: {

	},
	brush: {
		
	}
}
setOption: {
	
}
getTheme: {
	
}
setTheme: {
	
}
getDom: {
	
}
setDom: {
	
}
destory: {

}
resize: {

}

/**/
events:
'click','mouseover','doubleclick','rightclick','resize','legend','change:...',''
