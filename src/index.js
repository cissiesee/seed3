//var d3 = require('d3');
var Chart = require('./chart');
//var chartModel = require('./model/chart_model');
var _ = require('lodash');
var Action = require('./actions/action');
var Events = require('./component/events');
/*var buildInThemes = {
	theme1: require('./theme/candy'),
	theme2: require('./theme/cold')
};*/

function mergeThemeToOpts(opts, theme) {
	return;
}

function Seed3(selector) {
	//this._init(selector);
	//make sure init an html element
	if(typeof(selector) === 'string') {
		this._init(d3.select(selector).node());
	} else if(_.isElement(selector)) {
		this._init(selector);
	}
}

Seed3.prototype = {
	constructor: Seed3,
	_init: function(dom) {
		this.init = true;
		this.dom = dom;
		this._chart = new Chart(dom);
		//init data model of chart
		//this._model = chartModel.init();
		return this;
	},
	getOption: function() {
		return chartModel.get();
		//return this._chart.option();
	},
	setOption: function(options, opts) {
		//this._chart.options(this._options, opts);
		//this._chart(this._dom);
		Action.setOption(options, opts);
		//chartModel.set(options, opts);
		return this;
	},
	getTheme: function() {
		return chartModel.getTheme();
		//return this._chart.theme();
	},
	setTheme: function(theme) {
		Action.setTheme(theme);
		//chartModel.setTheme(theme);
		/*var themePackage = theme;
		if(typeof(theme) === 'string') {
			themePackage = buildInThemes[theme] || buildInThemes['candy'];
		}
		this._chart.theme(themePackage);
		this._chart(this._dom);*/
		return this;
	},
	addSeries: function(series) {
		Action.addSeries(series);
		//chartModel.addSeries(series);
		return this;
	},
	destroy: function() {
		Action.destroy();
	},
	resize: function() {
		var layout = {width: this.dom.clientWidth, height: this.dom.clientHeight};
		this.setOption({
			layout: layout
		});
		//Action.resize();
		//Events.fire('resize');
		//this._chart.layout(layout);
		//this._chart(this._dom);
		return this;
	},
	reset: function() {
		Action.reset();
		//this._chart.reset();
		return this;
	},
	on: function(type, callback) {
		Events.add(type, callback);
	},
	off: function(type, callback) {
		Events.remove(type, callback);
	}
}

window.Seed3 = Seed3;

module.exports = Seed3;