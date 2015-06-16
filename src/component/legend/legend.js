var _ = require('lodash');
var legend = require('../legend/legend');
module.exports = function() {
	var opts = {};

	var lgd = function() {
		return legend(opts);
	};
	lgd.data = function(data) {
		if(data == undefined) {
			return opts.data;
		}
		opts.data = data;
		return lgd;
	};
	lgd.toggleClass = function(className) {
		if(className == undefined) {
			return opts.toggleClass;
		}
		opts.toggleClass = className;
		return lgd;
	};
	lgd.toggleEventType = function(eventType) {
		if(toggleEventType == undefined) {
			return opts.toggleEventType;
		}
		opts.toggleEventType = toggleEventType;
		return lgd;
	};
	lgd.highlightEventType = function(eventType) {
		if(highlightEventType == undefined) {
			return opts.highlightEventType;
		}
		opts.highlightEventType = highlightEventType;
		return lgd;
	};
	lgd.position = function(position) {
		if(type == undefined) {
			return opts.position;
		}
		opts.position = position;
		return lgd;
	};
	lgd.layout = function(layout) { //d3scale
		if(layout == undefined) {
			return opts.layout;
		}
		_.extend(opts.layout, layout);
		return lgd;
	};
	lgd.theme = function(theme) { //d3scale
		if(theme == undefined) {
			return opts.theme;
		}
		_.extend(opts.theme, theme);
		return lgd;
	};
	lgd.span = function(span) {
		if(span == undefined) {
			return opts.span;
		}
		opts.span = span;
		return lgd;
	};
	lgd.domType = function(domType) {
		if(domType == undefined) {
			return opts.domType;
		}
		opts.domType = domType;
		return lgd;
	};
	lgd.options = function(options) { //d3scale
		if(!options) {
			return opts;
		}
		_.extend(opts, options);
		return lgd;
	};
	return lgd;
}