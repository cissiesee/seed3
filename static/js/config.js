define(function(require) {
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

	return {
		getDataType: function(chartType) {
			return chartTypeToDataType[chartType];
		},
		getContainerTag: function(domType) {
			return containerTag[domType];
		},
		getRoot: function(domType) {
			return rootTag[domType];
		},
		getContainerAttrs: function(container) {
			return containerAttrs[container];
		}
	}
})