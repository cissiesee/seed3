var Backbone = require('backbone');
var _ = require('lodash');
var dispatch = require('../dispatch');
var Collection = Backbone.Collection;
var Model = Backbone.Model;

var chartModel = new Model();
var axesCollection = new Collection();
var seriesCollection = new Collection();
var theme;

var defaults = {
	domType: 'svg'
};
//chartModel.set('series', seriesCollection);

function mergeThemeToOpts(opts, theme) {
	//todo
	return data;
}

function processSeries(seriesName, opts) {
	var series = chartModel.get('series');
	if(!series) return;
	var selectedSeries = _.where(series, {name: seriesName});
	if(selectedSeries.length) {
		selectedSeries.each(function(item) {
			_.extend(item, opts);
		});
	}
}

dispatch.on('set_option', function(data, opts) {
	//todo merge
	chartModel.set(_.extend(defaults,data));
});

dispatch.on('set_theme', function(data) {
	theme = data;
	var newData = mergeThemeToOpts(chartModel.toJSON, data);
	chartModel.set(newData);
});

dispatch.on('add_series', function(data) {
	var series = chartModel.get('series');
	series = series || [];
	series.push(data);
	//seriesCollection.add(data);
});

dispatch.on('remove_series', function(seriesName) {
	processSeries(seriesName, {enabled: false});
});

dispatch.on('show_series', function(seriesName) {
	processSeries(seriesName, {show: true});
});

dispatch.on('hide_series', function(data) {
	processSeries(seriesName, {show: false});
});

dispatch.on('reset', function() {
	chartModel.reset();
});

/*dispatch.on('add_axis', function(axis, opts) {
	axesCollection.add(axis, opts);
});*/



dispatch.on('resize', function(data) {
	chartModel.set('layout', data);
});

module.exports = {
	on: function(type, callback) {
		chartModel.on(type, callback);
		//seriesCollection.on(type, callback);
	},
	onSeries: function(type, callback) {
		seriesCollection.on(type, callback);
		//seriesCollection.on(type, callback);
	},
	getOption: function() {
		var options = chartModel.toJSON();
		options.axes = axesCollection.toJSON();
		options.series = seriesCollection.toJSON();
		return options;
	},
	getTheme: function() {
		return theme;
	}
}
