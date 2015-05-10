var chartTypeToDataType = {
	'line': 'tablet',
	'bar': 'tablet',
	'area': 'tablet',
	'scatter': 'tablet',
	'pie': 'tablet',
	'rose': 'tablet',
	'radar': 'tablet',
	'heatmap': 'tablet',
	'piemap': 'tablet',
	'treemap': 'hierarchy',
	'chord': 'hierarchy',
	'geomap': 'tablet'
}

var containerTag = {
	'svg': 'g',
	'div': 'div'
}

var rootTag = {
	'svg': 'svg',
	'div': 'div'
}

var containerAttrs = {
	'plot': {'class': 'plot-container'},
	'series': {'class': 'series-container'},
	'axis': {'class': 'axis-container'}
}

module.exports = {
	getDataType: function(chartType) {
		return chartTypeToDataType[chartType];
	},
	getContainerTag: function(domType) {
		return containerTag[domType || 'svg'];
	},
	getRoot: function(domType) {
		return rootTag[domType || 'svg'];
	},
	getContainerAttrs: function(container) {
		return containerAttrs[container];
	}
};