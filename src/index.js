var d3 = require('d3');
var Axis = require('./component/axis/axis');
var Legend = require('./component/legend/legend');
var Series = require('./component/series/series');
var Tooltip = require('./component/tooltip/tooltip');
var chartModel = require('./model/chart_model');
var buildInThemes = {
	theme1: require('./theme/candy'),
	theme2: require('./theme/cold')
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
		this._options = {};
		return this;
	},
	getOption: function() {
		return _.cloneDeep(this._options);
	},
	setOption: function(options, opts) {
		opts.reset ? _.extend(this._options, options) : this._options = options;
		//var model = new ChartModel(options);
		chartModel.init(this._options);
		var axis = Axis(options.axis),
			legend = Legend(options.legend),
			series = Series(options.series),
			tooltip = Tooltip(options.tooltip);
		return this;
	},
	getTheme: function() {
		return _.cloneDeep(this._theme);
	},
	setTheme: function(theme) {
		var themePackage = theme;
		if(typeof(theme) === 'string') {
			themePackage = buildInThemes[theme] || buildInThemes['candy'];
		}
		mergeThemeToOpts(this._options, themePackage);var 
		this.setOption(this._options);
		return this;
	},
	addSeries: function(series) {
		chartModel.addSeries(series);
		return this;
	},
	destroy: function() {

	},
	resize: function() {

	},
	reset: function() {

	},
	on: function(type, callback) {

	},
	off: function(type, callback) {

	}
}

window.Seed3 = Seed3;

module.exports = Seed3;