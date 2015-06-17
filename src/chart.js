var _ = require('lodash');

var chartModel = require('./model/chart_model');

var Title = require('./component/title');
var Axis = require('./component/axis/axis');
var Legend = require('./component/legend/legend');
var Series = require('./component/series/series');
var Events = require('./component/events');
var Tooltip = require('./component/tooltip/tooltip');

module.exports = function() { //mange and distribution
	//var defer = when.defer();
	var _opts = {};
	var _theme = {};

	function createContainer(root, opts) {
		var containerTag = opts.domType || 'g';
		var chartContainer = root.append(opts.domType || 'svg') //div, svg
			.attr({
				'class': 'chart-container',
				'position': 'relative'
			});

		if(containerTag == 'g') {
			chartContainer.attr({
				'width': opts.layout.width,
				'height': opts.layout.height
			});
		} else {
			chartContainer.style({
				'width': opts.layout.width ? opts.layout.width + 'px': '100%',
				'height': opts.layout.height ? opts.layout.height + 'px': '100%',
				'background': '#fff',
				'position': 'relative'
			});
		}
		return chartContainer;
	}

	function validateOptions(opts) {

	}

	var chart = function(dom) {

		//create components
		var title = Title().options(_opts.title);
		var axis = Axis().options(_opts.axis);
		var legend = Legend().options(_opts.legend);
		var series = Series().options(_opts.series);
		var events = Events().options(_opts.events);
		var tooltip = Tooltip().options(_opts.tooltip);

		var chartRoot = d3.select(dom);
		var chartContainer = createContainer(chartRoot, _opts);

		//draw
		chartContainer
			.call(title)
			.call(axis)
			.call(legend)
			.call(series)
			.call(events);

		chartRoot.call(tooltip);

		return;
	};

	chart.theme = function(theme) {
		if(!theme) {
			return _theme;
		}
		_.extend(_theme, theme);
		mergeThemeToOpts(_opts, _theme);
		chartModel.update(_opts);
		return chart;
	};
	chart.title = function(title) {
		if(!title) {
			return _opts.title;
		}
		_opts.title = title;
		chartModel.update(_opts);
		return chart;
	};
	chart.layout = function(layout) {
		if(!layout) {
			return _opts.layout;
		}
		_.extend(_opts.layout, layout);
		return chart;
	};
	chart.tooltip = function(tooltip) {
		if(!tooltip) {
			return chartModel.get('tooltip');
			//return _opts.tooltip;
		}
		_opts.tooltip = tooltip;
		chartModel.update(_opts);
		return chart;
	};
	chart.legend = function(legend) {
		if(!legend) {
			return _opts.legend;
		}
		_opts.legend = legend;
		chartModel.update(_opts);
		return chart;
	};
	chart.onComplete = function(fn) {
		_opts.onComplete = fn;
		return chart;
	};
	chart.options = function(options, opts) {
		if(!options) {
			return _.cloneDeep(_opts);
		}
		if(opts) {
			opt.merge === false ? options = options : _.extend(_opts, options);
		}
		chartModel.update(_opts);
		/*if(validateOptions(options)) {
			chartModel.update(_opts);
		};*/ //todo move it to chartmodel
		return chart;
	}
	return chart;
}