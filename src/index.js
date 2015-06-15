// created by zhetinghuang
// start: 2014-12-31
var _ = require('lodash');
require('./d3');
require('./d3_extend');
//require('./d3.layout.cloud');

var chartService = require('./service/chart');
var plotService = require('./service/plot');
var legendService = require('./service/legend');
var tooltipService = require('./service/tooltip');
/**
 * data example(tabular): 
 * config: {chartTitle: 'chart title', xTitle: 'x title', yTitle: 'y title'},
 * items: [
 *	{name: 'series1', color: '#ccc', type: 'line', nodes: [{x: 1, y: 2}, {x: 5, y: 3}]},
 *	{name: 'series2', color: '#eee', type: 'bar', nodes: [{x: 1, y: 2}, {x: 7, y: 0}]}
 * ]
 *
 */

/*juicer.set({
	'tag::interpolateOpen': '{'
});*/

var psd3 = {
	setOption: function(opts) {
		var chart = chartService().options(opts);
		return chart(opts.selector);
	}
};




window.psd3 = psd3;

module.exports = psd3;

var Axis = require('./component/axis');
var Legend = require('./component/legend');
var Series = require('./component/series');
var Tooltip = require('./component/tooltip');
var ChartModel = require('./model/chart_model');

function Seed3(config) {
	this.init(config);
}

Seed3.prototype = {
	constructor: Seed3,
	init: function(config) {
		var model = new ChartModel(config);
		return {
			axis: new Axis(model, config.axis),
			legend: new Legend(model, config.legend),
			series: new Series(model, config.series),
			tooltip: new Tooltip(config.tooltip)
		}
	}
}