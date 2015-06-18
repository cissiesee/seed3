//var d3 = require('d3');
var Chart = require('./chart');
//var chartModel = require('./model/chart_model');
var Action = require('./action/action');
var buildInThemes = {
	theme1: require('./theme/candy'),
	theme2: require('./theme/cold')
};

function mergeThemeToOpts(opts, theme) {
	return;
}

function Seed3(selector) {
	if(typeof(selector) === 'string')) {
		this._init(d3.select(selector));
	} else if(_.isElement(selector)) {
		this._init(selector);
	}
}

Seed3.prototype = {
	constructor: Seed3,
	_init: function(dom) {
		this.init = true;
		this.dom = dom;
		this._chart = Chart();
		//init data model of chart
		//this._model = chartModel.init();
		return this;
	},
	getOption: function() {
		return this._chart.option();
	},
	setOption: function(options, opts) {
		this._chart.options(this._options, opts);
		this._chart(this._dom);
		return this;
	},
	getTheme: function() {
		return this._chart.theme();
	},
	setTheme: function(theme) {
		var themePackage = theme;
		if(typeof(theme) === 'string') {
			themePackage = buildInThemes[theme] || buildInThemes['candy'];
		}
		this._chart.theme(themePackage);
		this._chart(this._dom);
		return this;
	},
	addSeries: function(series) {
		Action.addSeries(series);
		//chartModel.addSeries(series);
		return this;
	},
	destroy: function() {

	},
	resize: function() {
		var layout = {width: dom.style.width, height: dom.style.height};
		Action.resize(layout);
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

	},
	off: function(type, callback) {

	}
}

window.Seed3 = Seed3;

module.exports = Seed3;