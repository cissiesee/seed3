var _ = require('lodash');
//var when = require('when');
var axes = {
	'rectangle': require('./rectangle'),
	'polar': require('./polar')
};

module.exports = function() {
	var opts = {
		type: 'rectangle' //'polar'
		grid: {
			x: true,
			y: false,
			style: {

			}
		}
	};

	var axis = function() {
		//var defer = when.defer();
		var axisObj = axes[opts.type](opts);
		return axisObj;
	};
	tip.selector = function(selector) {
		if(selector == undefined) {
			return opts.selector;
		}
		opts.selector = selector;
		return tip;
	};
	tip.type = function(type) {
		if(type == undefined) {
			return opts.type;
		}
		opts.type = type;
		return tip;
	};
	tip.tpl = function(tpl) {
		if(tpl == undefined) {
			return opts.tpl;
		}
		opts.tpl = tpl;
		return tip;
	};
	tip.eventType = function(eventType) { //boolean
		if(eventType == undefined) {
			return opts.eventType;
		}
		opts.eventType = eventType;
		return tip;
	};
	tip.animation = function(animation) { //boolean
		if(animation == undefined) {
			return opts.animation;
		}
		opts.animation = animation;
		return tip;
	};
	tip.orient = function(orient) { //string
		if(orient == undefined) {
			return opts.orient;
		}
		opts.orient = orient;
		return tip;
	};
	tip.offset = function(offset) { //object {top, right, bottom, left}
		if(offset == undefined) {
			return opts.offset;
		}
		opts.offset = offset;
		return tip;
	};
	tip.onUpdate = function(fn) {
		opts.onComplete = fn;
		return tip;
	};
	tip.options = function(options) { //d3scale
		if(!options) {
			return opts;
		}
		_.extend(opts, options);
		return tip;
	};
	return axis;
}