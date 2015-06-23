var _ = require('lodash');

var chartModel = require('./model/chart_model');

var Title = require('./component/title');
var Axis = require('./component/axis/axis');
var Legend = require('./component/legend/legend');
var Series = require('./component/series/series');
var Events = require('./component/events');
var Tooltip = require('./component/tooltip/tooltip');

function update(data) {
	this.root.select('.chart-container').remove(); //todo check api
	var newContainer = this.root
		.append(function(d) {
			return data.domType || 'svg';
		})
		.datum(data)
		.attr({
			'class': 'chart-container'
		})
		.style({
			'position': 'relative'
		});

	resize(newContainer);

	//sub function init
	newContainer
		.call(this.title)
		.call(this.axis)
		.call(this.legend)
		.call(this.series)
		.call(this.events);

	return newContainer;
}

function resize(data) {
	//var root = this.root;
	this.root.select('.chart-container')
		.attr({
			'width': function(d) {
				if(d.domType === 'div') {
					return;
				}
				return data.layout.width;
			},
			'height': function(d) {
				if(d.domType === 'div') {
					return;
				}
				return data.layout.height;
			}
		})
		.style({
			'width': function(d) {
				if(d.domType !== 'div') {
					return;
				}
				return data.layout.width;
			},
			'height': function(d) {
				if(d.domType !== 'div') {
					return;
				}
				return data.layout.height;
			}
		});
	return this;
}

function Chart(dom) {
	this.init(dom);
}

Chart.prototype = {
	constructor: Chart,
	init: function(dom) {
		var self = this;
		this.title = Title();//.options(chartModel.get('title'));
		this.axis = Axis();//.options(chartModel.get('axis'));
		this.legend = Legend();//.options(chartModel.get('legend'));
		this.series = Series();//.options(chartModel.get('series'));
		this.events = Events();//.options(chartModel.get('events'));
		this.tooltip = Tooltip();//.options(chartModel.get('tooltip'));
		this.root = d3.select(dom);
		this.root.call(tooltip);
		//this.chartContainer = createContainer(chartRoot, _opts);
		chartModel.on('change:domType', function(data) {
			update.call(self, data);
		});
		chartModel.on('change:layout', function(data) {
			resize.call(self, data);
		});
		//this._draw.call(dom);
	}
}

module.exports = Chart;