var _ = require('lodash');

var chartModel = require('./model/chart_model');

var Title = require('./component/title');
var Axis = require('./component/axis/axis');
var Legend = require('./component/legend/legend');
var Series = require('./component/series/series');
var Events = require('./component/events');
var Tooltip = require('./component/tooltip/tooltip');

function Chart(dom) {
	this.init(dom);
}

Chart.prototype = {
	constructor: Chart,
	init: function(dom) {
		this.title = Title().options(chartModel.get('title'));
		this.axis = Axis().options(chartModel.get('axis'));
		this.legend = Legend().options(chartModel.get('legend'));
		this.series = Series().options(chartModel.get('series'));
		this.events = Events().options(chartModel.get('events'));
		this.tooltip = Tooltip().options(chartModel.get('tooltip'));
		this.chartRoot = this.chartRoot || d3.select(dom);
		chartModel.on('change', function(data) {
			this._draw(data);
		});
		//this._draw.call(dom);
	},
	_draw: function() {
		this.chartRoot = this.chartRoot || d3.select(this);
		this.chartContainer = this.chartContainer || createContainer(chartRoot, _opts);

		//draw
		chartContainer
			.call(title)
			.call(axis)
			.call(legend)
			.call(series)
			.call(events);

		chartRoot.call(tooltip);
	}
}

module.exports = function() {
	var title = Title().options(chartModel.get('title')),
		axis = Axis()	.options(chartModel.get('axis')),
		legend = Legend().options(chartModel.get('legend')),
		series = Series().options(chartModel.get('series')),
		events = Events().options(chartModel.get('events')),
		tooltip = Tooltip().options(chartModel.get('tooltip'));
}

module.exports = function() { //mange and distribution
	//var defer = when.defer();
	var _opts = {},
		_theme = {};

	var title = Title(),
		axis = Axis(),
		legend = Legend(),
		series = Series(),
		events = Events(),
		tooltip = Tooltip();

	var chartRoot, chartContainer;

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
		title.options(chartModel.get('title'));
		axis.options(chartModel.get('axis'));
		legend.options(chartModel.get('legend'));
		series.options(chartModel.get('series'));
		events.options(chartModel.get('events'));
		tooltip.options(chartModel.get('tooltip'));

		chartRoot = chartRoot || d3.select(dom);
		chartContainer = chartContainer || createContainer(chartRoot, _opts);

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
			return chartModel.getTheme();
		}
		chartModel.setTheme(theme);
		return chart;
	};
	chart.title = function(title) {
		if(!title) {
			return chartModel.get('title');
		}
		chartModel.set('title', title);
		return chart;
	};
	chart.layout = function(layout) {
		if(!layout) {
			return chartModel.get('layout');
		}
		chartModel.set('layout', layout);
		return chart;
	};
	chart.tooltip = function(tooltip) {
		if(!tooltip) {
			return chartModel.get('tooltip');
		}
		chartModel.set('tooltip', tooltip);
		return chart;
	};
	chart.legend = function(legend) {
		if(!legend) {
			return chartModel.get('legend');
		}
		chartModel.set('legend', legend);
		return chart;
	};
	chart.onComplete = function(fn) {
		_opts.onComplete = fn;
		return chart;
	};
	chart.options = function(options, opts) {
		if(!options) {
			return chartModel.toJSON();
			//return _.cloneDeep(_opts);
		}
		if(opts) {
			opt.merge === false ? options = options : _.extend(_opts, options);
		}
		chartModel.set(_opts);
		//chartModel.validate()
		/*if(validateOptions(options)) {
			chartModel.update(_opts);
		};*/ //todo move it to chartmodel
		return chart;
	};
	return chart;
}