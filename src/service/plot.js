//var scale = require('../scale/scale');
var _ = require('lodash');
var chartConfig = require('../config');
var when = require('when');
var utils = require('../utils');
var seriesGenerator = require('../series/series');
var scale = require('../scale/scale');
var axis = require('../axis/axis');
/**
   * module for creating  the containers and connect all the sub modules belongs to plot
   */
module.exports = function() { //create chart maker
	var _opts = {};

	var chartMaker = function(container) { //create chart object
		_opts.container = container;
		var defer = when.defer();

		var makeScale = function(axisOpts, scaleGenerator) {
			var scaleOpts = {
				containerTag: _opts.containerTag,
				type: axisOpts.type,
				layout: _opts.layout,
				scales: _.map(axisOpts.data, function(axis) {
					var scaleOpt = _.extend(axis.scale, {key: axis.key, type: axis.type, values: axis.values});
					return scaleOpt;
				})
			};

			console.log('scaleOpts:',scaleOpts);
			return scaleGenerator(scaleOpts);
		}

		var makeAxis = function(opts, axisGenerator, scales) {
			var axisOpts = {
				containerTag: _opts.containerTag,
				type: opts.type,
				grid: opts.grid,
				scales: scales,
				axes: _.map(opts.data, function(axis) {
					var axisOpt = _.extend(axis.show, {key: axis.key, type: axis.type, dataKey: axis.dataKey, title: axis.title});
					return axisOpt;
				})
			};

			console.log('axisOpts: ', axisOpts);
			return axisGenerator(axisOpts);
		}

		var drawContainer = function() {
			var	container = typeof(_opts.container) == 'string' ? d3.select(_opts.container) : _opts.container,
				axis = _opts.axis,
				theme = _opts.theme || {};

			var plotContainer = container.append(_opts.containerTag) //div
				.attr({
					class: 'plot-container'
				});

			if(_opts.containerTag == 'div') {
				plotContainer.style({
					position: 'absolute',
					width: '100%'
				});
			}

			var axisContainer;

			if(_opts.axis) {
				axisContainer = plotContainer.append(_opts.containerTag).attr('class', 'axis-container');
			}
			
			var seriesContainer = plotContainer.append(_opts.containerTag).attr('class', 'series-container');

			return {
				plot: plotContainer,
				axis: axisContainer,
				series: seriesContainer
			}
		}

		var drawGraph = function(containers, scales, axisGenerator) {
			//var graphDefer = when.defer();
			if(axisGenerator) {
				var axes = axisGenerator(containers.axis);
				scales.dispatcher.on('change', function(key, scale) {
					axes.update(key, scale);
				});
			}

			var seriesObject = seriesGenerator({
				container: containers.series,
				series: _opts.series,
				colors: _opts.colors,
				scales: scales,
				containerTag: _opts.containerTag,
				config: _opts.config
			});

			return {
				series: seriesObject,
				axes: axes
			}
		}

		//var serviceData = adapter_.pluck((data);
		var processConfig = function(opts) {
			var chartTypes = _.pluck(opts.series, 'type');
			if(!chartTypes.length) {
				throw new Error('type must be specified in series config!');
			}

			var _data = opts.data;

			if(opts.config) {
				var _data = d3.helper.parseData(opts.data, opts.config);
			}
			
			//console.log(_data);
			opts.series = _.merge(opts.series, _data);

			if(opts.axis) {
				opts.axis = d3.helper.processAxis(opts.axis, _data);
			}
			//write axis info into data, merge data to series, and then seriesdata is used by all modules
			//merge theme into modules:series, legend, tooltip .etc
			//process scale
			//var axisOpts = d.axis;
			return opts;
			//return processor[chartConfig.getDataType(chartTypes[0])](opts);
		}

		var makeChart = function(scaleGenerator, axisSource, config) {
			//var chartDefer = when.defer();
			d3.select(_opts.container).empty(); //needed to be checked
			var d3container = drawContainer(_opts);
			var scales, axisGenerator;
			if(scaleGenerator) {
				scales = makeScale(_opts.axis, scaleGenerator);
				console.log('scales: ', scales);
				axisGenerator = makeAxis(_opts.axis, axisSource, scales);
				console.log('axisGenerator: ', axisGenerator);
			}

			var graphObj = drawGraph(d3container, scales, axisGenerator);

			graphObj.series.dispatcher.on('change', function(axis, key) {
				scales.set(axis, {
					values: d3.helper.getDomain(_opts.series, key)
				});
			});

		      /*if(opts.onComplete) {
				serviceData.onComplete(plotObj);
			}*/

			return {
				plot: d3container.plot,
				scales: scales,
				graph: graphObj,
				showSeries: function(series) {
					var valueAxis = _.find(scales.data, {type: 'value'}).key;
					graphObj.series.showSeries(series);
				},
				hideSeries: function(series) {
					graphObj.series.hideSeries(series);
				}
			}

			//return chartDefer.promise;
		};

		var chartObj;

		if(_opts.axis) {
			//var chartOpts, chartObj;
			processConfig(_opts);
			console.log(_opts);
			chartObj = makeChart(scale, axis);
			//defer.resolve(chartObj);
		} else {
			_opts.series = _.map(_opts.data, function(d, i) {
				return _.extend(d, _opts.series[i] || {});
			});
			chartObj = makeChart();
		}

		return chartObj;
	};

	chartMaker.layout = function(o) {
		if(!o) {
			return _opts.layout;
		}
		_opts.layout = o;
		return chartMaker;
	};
	chartMaker.axis = function(o) {
		if(!o) {
			return opts.axis;
		}
		_opts.axis = o;
		return chartMaker;
	};
	chartMaker.series = function(series) {
		if(series == undefined) {
			return _opts.series;
		}
		_opts.series = series;
		return chartMaker;
	};
	chartMaker.on = function(type, fn) { //fn = function(e, data){}
		_opts.events[type].push(fn);
		return chartMaker;
	};
	chartMaker.options = function(options) { //d3scale
		if(!options) {
			return _opts;
		}
		_opts = _.cloneDeep(_.extend(_opts, options));
		return chartMaker;
	};

	return chartMaker;
}