var _ = require('lodash');

var chartModel = require('./model/chart_model');

var Title = require('./component/title');
//var Axis = require('./component/axis/axis');
//var Legend = require('./component/legend/legend');
//var Series = require('./component/series/series');
//var Events = require('./component/events');
//var Tooltip = require('./component/tooltip/tooltip');

function redraw(data) {
	this.root.select('.chart-container').remove(); //todo check api
	var newContainer = this.root
		.append(data.get('domType'))
		.attr({
			'class': 'chart-container'
		})
		.style({
			'position': 'relative',
			'background': '#eee'
		});

	resize.call(this, data);

	//sub function init
	newContainer
		.datum({
			domType: data.get('domType'),
			title: data.get('title')
		})
		.call(this.title);
		// .call(this.axis)
		// .call(this.legend)
		// .call(this.series)
		// .call(this.events);

	return newContainer;
}

function resize(data) {
	//var root = this.root;
	var width = getSize.call(this, 'width', data);
	var height = getSize.call(this, 'height', data);
	var domType = data.get('domType');

	var nodes = this.root.select('.chart-container');

	if(data.get('animation')!==false) {
		nodes = nodes.transition();
	}

	nodes
		.attr({
			'width': function() {
				if(domType === 'div') {
					return;
				}
				return width;
			},
			'height': function() {
				if(domType === 'div') {
					return;
				}
				return height;
			}
		})
		.style({
			'width': function() {
				if(domType !== 'div') {
					return;
				}
				return width + 'px';
			},
			'height': function() {
				if(domType !== 'div') {
					return;
				}
				return height + 'px';
			}
		});
	return this;
}

function getSize(type, data) {
	var size;
	if(data.get('layout') && data.get('layout')[type]) {
		size = data.get('layout')[type];
	} else {
		size = this.root.style(type).match(/\d+/)[0];
	}
	return size * 1;
}

function Chart(dom) {
	this.init(dom);
}

Chart.prototype = {
	constructor: Chart,
	init: function(dom) {
		var self = this;
		this.title = Title();//.options(chartModel.get('title'));
		// this.axis = Axis();//.options(chartModel.get('axis'));
		// this.legend = Legend();//.options(chartModel.get('legend'));
		// this.series = Series();//.options(chartModel.get('series'));
		// this.events = Events();//.options(chartModel.get('events'));
		// this.tooltip = Tooltip();//.options(chartModel.get('tooltip'));
		this.root = d3.select(dom);
		// this.root.call(this.tooltip);
		//this.chartContainer = createContainer(chartRoot, _opts);
		//update.call(this, data)
		chartModel.on('change:domType', function(data) {
			//console.log('domType');
			redraw.call(self, data);
		});

		chartModel.on('change:layout', function(data) {
			//console.log('chart title');
			resize.call(self, data);
		});
		//this._draw.call(dom);
	}
}

module.exports = Chart;