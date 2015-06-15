var Backbone = require('backbone');
var Collection = Backbone.Collection;
var Model = Backbone.Model;
var _ = require('lodash');

function SeriesModel(series) {
	//var defaults = {};
	//var opts = _.extend(defaults, axis);
	this.init(series);
}

AxisCollection.prototype = {
	constructor: AxisCollection,
	init: function(series) {
		return new Collection(series);
	},
	destory: function() {
		this = null;
	}
}