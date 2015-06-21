var _ = require('lodash');

var chartModel = require('./model/chart_model');

var Title = require('./component/title');
var Axis = require('./component/axis/axis');
var Legend = require('./component/legend/legend');
var Series = require('./component/series/series');
var Events = require('./component/events');
var Tooltip = require('./component/tooltip/tooltip');

function updateContainer(data) {
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

	return redrawContainer(newContainers);
}

function redrawContainer(container) {
	var root = this.root;
	container
		.attr({
			'width': function(d) {
				if(d.domType === 'div') {
					return;
				}
				return root.style('width');
			},
			'height': function(d) {
				if(d.domType === 'div') {
					return;
				}
				return root.style('height');
			}
		})
		.style({
			'width': function(d) {
				if(d.domType !== 'div') {
					return;
				}
				return root.style('width');
			},
			'height': function(d) {
				if(d.domType !== 'div') {
					return;
				}
				return root.style('height');
			}
		});
	return container;
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
		this.chartRoot = d3.select(dom);
		chartRoot.call(tooltip);
		//this.chartContainer = createContainer(chartRoot, _opts);
		chartModel.on('change:domType', function(data) {
			self.update.call(self, data);
		});
		chartModel.on('change:layout', function(data) {
			redrawContainer.call(self, data);
		});
		//this._draw.call(dom);
	},
	update: function(data) {
		updateContainer.call(this, data);

		//draw
		chartContainer
			.call(this.title)
			.call(this.axis)
			.call(this.legend)
			.call(this.series)
			.call(this.events);
	}
}

module.exports = Chart;