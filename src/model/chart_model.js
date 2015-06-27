var Backbone = require('backbone');
var _ = require('lodash');
var dispatch = require('../dispatch');
var Collection = Backbone.Collection;
var Model = Backbone.Model;

var chartModel = new Model();
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
	seriesCollection.add(data);
});

dispatch.on('remove_series', function(data) {
	seriesCollection.remove(data);
});

dispatch.on('show_series', function(dataId) {
	seriesCollection.get(dataId).set('show', true);
});

dispatch.on('hide_series', function(data) {
	seriesCollection.get(dataId).set('show', false);
});

dispatch.on('reset', function() {
	chartModel.reset();
	seriesCollection.reset();
});

dispatch.on('resize', function(data) {
	chartModel.set('layout', data);
});

module.exports = {
	on: function(type, callback) {
		chartModel.on(type, callback);
		seriesCollection.on(type, callback);
	},
	getOption: function() {
		var options = chartModel.toJSON();
		options.series = seriesCollection.toJSON();
		return options;
	},
	getTheme: function() {
		return theme;
	}
}
