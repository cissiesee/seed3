var _ = require('lodash');
function parseData(d, map) {
	var newD = _.clone(d, true);
	_.each(newD, function(v) {
		parseCollection(v.data, map);
	});
	return newD;
}

function parseCollection(d, map) {
	//todo transform tablet data to axis-oriented data
	if(d.length === 0) {
		return;
	}
	if(d.length) {
		//batch handler
		_.each(d, function(value, i) {
			value.node = {};
			_.each(map, function(v, k) {
				value.node[k] = value[v];
			});
		});
	} else {
		//single handler
		d.node = {};
		_.each(map, function(v, k) {
			d.node[k] = d[v];
		});
	}
	return d;
}

function processAxis(axes, d) {
	_.each(axes.data, function(axis, i) {
		var values = getDomain(d, axis.key);
		axis.values = values;
	});
	return axes;
}

function processStack() {
	//todo
}

function getDomain(d, key) {
	if(!d.length) {
		return;
	}
	var values = [];
	var _d = _.filter(d, function(item) {
		return item.show!==false;
	});

	_.each(_d, function(v) {
		values.push(_.pluck(_.pluck(v.data, 'node'), key));
	});

	return _.unique(d3.merge(values));
}

d3.helper = {
	parseData: parseData,
	parseCollection: parseCollection,
	processAxis: processAxis,
	getDomain: getDomain,
	parseLayout: function(layout) { // margin: '0 0'
		//todo
		return {top: 0, right: 0, bottom: 0, left: 0};
	},
	getTransform: function(translateStr, type) {
		return d3.transform(translateStr)[type || 'translate'];
		/*var matches = translateStr.match(/\(\s*([\d\.]+)\s*,\s*([\d\.]+)\s*\)/);
		return _.map([matches[1], matches[2]], function(d, i) {
			return d - 0;
		})*/
	},
	setTransform: function(obj) {
		var transformArr = [];
		_.each(obj, function(value, key) {
			transformArr.push(key + '(' + value + ')');
		});
		return transformArr.join(' ');
	}
}

d3.svg.symbol.rectPoint = function() {}

module.exports = d3.helper;

//todo extend d3.svg.symbol

//return d3.helper;