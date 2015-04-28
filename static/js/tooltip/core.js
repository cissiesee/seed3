define(function(require) {
	var Tooltip = require('./tooltip');

	return function(opts) {
		var tooltipOpts = _.extend({id : 'node-tip'}, opts);
		var tooltip = new Tooltip(tooltipOpts);

		return tooltip;
	}
})