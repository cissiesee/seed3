var Backbone = require('backbone');
var Collection = Backbone.Collection;
var Model = Backbone.Model;
var _ = require('lodash');

function AxisModel(axis) {
	var defaults = {};
	var opts = _.extend(defaults, axis);
	this.init(opts);
}

function makeScale(axes) {
	return scales;
}

AxisCollection.prototype = {
	constructor: AxisCollection,
	init: function(opts) {
		this.model = new Model(opts);
		this.axes = new Collection(opts.axes);
		this.scales = makeScale(opts.axes);
	},
	destory: function() {
		this.model = null;
		this.axisList = null;
		this = null;
	}
}