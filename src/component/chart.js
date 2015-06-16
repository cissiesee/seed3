var _ = require('lodash');
var when = require('when');
var plotService = require('./plot');
var legendService = require('./legend');
var tooltipService = require('./tooltip');
var chartConfig = require('../config');

module.exports = function() { //mange and distribution
	var defer = when.defer();
	var opts = {};

	var chart = function(selector) {
		selector ? opts.selector = selector : selector = opts.selector;
		//var plot, tooltip, legend;

		opts.containerTag = chartConfig.getContainerTag(opts.domType);

		//var chartRoot = d3.select(selector);

		d3.select(selector).empty();

		var chartContainer = d3.select(selector).append(opts.domType || 'svg')
			.attr({
				'class': 'chart-container',
				'position': 'relative'
			});

		if(opts.containerTag == 'g') {
			chartContainer.attr({
				'width': opts.layout.width,
				'height': opts.layout.height
			});
		} else {
			chartContainer.style({
				'width': opts.layout.width + 'px',
				'height': opts.layout.height + 'px',
				'background': '#fff',
				'position': 'relative'
			});
		}

		if(!opts.plot) {
			console.log('! plot option must be set');
			return;
		}

		if(opts.colors) {
			if(opts.colors.length) {
				opts.colors = d3.scale.ordinal().range(opts.colors);
			} else {
				var domain = [], range = [];
				_.each(opts.colors, function(color, key) {
					domain.push(key);
					range.push(color);
				});
				opts.colors = d3.scale.ordinal().domain(domain).range(range);
			}
		} else {
			opts.colors = d3.scale.category20c();
		}

		var plotOpts = _.extend({
			colors: opts.colors,
			data: opts.data,
			config: opts.config,
			containerTag: opts.containerTag
		},opts.plot);
		
		var plotGenerator = plotService().options(plotOpts);

		var plotObj = plotGenerator(chartContainer);

		if(opts.tooltip) {
			var tooltipOpts = _.extend({
				container: selector,
				root: chartContainer,
				plot: plotObj.plot,
				containerTag: opts.containerTag,
				scales: plotObj.scales
			}, opts.tooltip);
			
			var tooltipGenerator = tooltipService().options(tooltipOpts);
			console.log('tooltip:', tooltipGenerator.options());
			var tooltipObj = tooltipGenerator();
		}

		if(opts.legend) {
			if(opts.legend.data) {
				var legendData = _.map(opts.legend.data, function(d) {
					var seriesd = _.find(plotOpts.series, {name: d.name});
					return _.extend(d, seriesd);
				});
				opts.legend.data = legendData;
			}
			var legendOpts = _.extend({
				colors: opts.colors,
				container: chartContainer,
				data: plotOpts.series,
				containerTag: opts.containerTag
			},opts.legend);

			console.log('legend opts',legendOpts);
			var legendGenerator = legendService().options(legendOpts);
			var legendObj = legendGenerator();
			legendObj.dispatcher.on('hide', function(d) {
				plotObj.hideSeries(d);
			});
			legendObj.dispatcher.on('show', function(d) {
				plotObj.showSeries(d);
			});
		}

		return {
			plot: plotObj,
			dom: selector
		}
	};

	chart.data = function(d) {
		if(!d) {
			return opts.data;
		}
		opts.data = d;
		return chart;
	};
	chart.theme = function(theme) {
		if(!theme) {
			return opts.theme;
		}
		_.extend(opts.theme, theme);
		return chart;
	};
	chart.title = function(title) {
		if(!title) {
			return opts.title;
		}
		opts.title = title;
		return chart;
	};
	chart.layout = function(layout) {
		if(!layout) {
			return opts.layout;
		}
		_.extend(opts.layout, layout);
		return chart;
	};
	chart.plot = function(plot) {
		if(!plot) {
			return opts.plot;
		}
		opts.plot = plot;
		return chart;
	};
	chart.tooltip = function(tooltip) {
		if(!tooltip) {
			return opts.tooltip;
		}
		opts.tooltip = tooltip;
		return chart;
	};
	chart.legend = function(legend) {
		if(!legend) {
			return opts.legend;
		}
		opts.legend = legend;
		return chart;
	};
	chart.onComplete = function(fn) {
		opts.onComplete = fn;
		return chart;
	};
	chart.options = function(options) {
		opts = _.cloneDeep(options);
		return chart;
	}
	return chart;
}