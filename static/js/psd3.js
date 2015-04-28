// created by zhetinghuang
// start: 2014-12-31
define(function(require) {
	require('lodash');
	require('juicer');
	require('d3');
	require('./d3_extend');
	//todo require('queue');

	var chartService = require('./service/chart');
	var plotService = require('./service/plot');
	var legendService = require('./service/legend');
	var tooltipService = require('./service/tooltip');

	var utils = require('./utils');
	/**
	 * data example(tabular): 
	 * config: {chartTitle: 'chart title', xTitle: 'x title', yTitle: 'y title'},
	 * items: [
	 *	{name: 'series1', color: '#ccc', type: 'line', nodes: [{x: 1, y: 2}, {x: 5, y: 3}]},
	 *	{name: 'series2', color: '#eee', type: 'bar', nodes: [{x: 1, y: 2}, {x: 7, y: 0}]}
	 * ]
	 *
	 */

	var resourceRoot = {
		type: './series/',
		scale: './scale/',
		axisTitle: './axistitle/',
		tooltip: './tooltip/',
		legend: './legend/'
	};

	var scaleMap = {
		'bar': 'category_value_point',
		'hbar': 'value_category_point',
		'area': 'time_value',
		'line': 'time_value_point',
		'radar': 'polar',
		'default': 'category_value',
		'scatter': 'value_value_point',
		'bubble': 'value_value_point',
		'heatmap': 'value_value_band'
	}

	/*juicer.set({
		'tag::interpolateOpen': '{'
	});*/

	return {
		plotService: plotService,
		legendService: legendService,
		tooltipService: tooltipService,
		chartService: chartService
	}
})