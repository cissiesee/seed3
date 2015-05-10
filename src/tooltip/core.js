var _ = require('lodash');
var Tooltip = require('./tooltip');

module.exports = function(opts) {
	var tooltipOpts = _.extend({id : 'node-tip'}, opts);
	var tooltip = new Tooltip(tooltipOpts);

	return tooltip;
}