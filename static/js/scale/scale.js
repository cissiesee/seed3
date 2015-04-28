define(function(require) {
	var dispatcher = d3.dispatch('change');
	//var scale = require('scale');
	//var scales = scale(opts);
	//x: scales.get('x')(d.x)
	//angle: scales.get('a').angle/radius(d.a);

	//desc: convert function-type to config-type
	function makeScale(opts) {
		var scale;
		var layout = opts.layout;
		var domain, range;

		if(!opts.values.length) {
			opts.values = [0, 0];
		}

		if(opts.type == 'time') {
			scale = d3.time.scale();
		} else {
			scale = d3.scale[opts.scaleType]();
		}

		if(opts.domain && typeof(opts.domain) == 'function') {
			domain = opts.range(values);
		} else {
			if(opts.type == 'category') {
				domain = opts.values.sort(opts.sort);
			} else {
				domain = [d3.min(opts.values) > 0 ? 0 : d3.min(opts.values), d3.max(opts.values)];
			}
		}

		scale.domain(domain);

		if(scale.nice && opts.nice !== false) {
			scale.nice();
		}

		if(opts.range && typeof(opts.range) == 'function') {
			range = opts.range(layout);
		} else {
			switch(opts.key) {
				case 'x':
					range = [layout.left, layout.left + layout.width];
					break;
				case 'y':
					range = [layout.top + layout.height, layout.top];
					break;
			}
		}

		scale[opts.rangeType](range, opts.padding, opts.outerPadding);

		return scale;
	};

	function rectangle(opts) {
		if(!opts.scales) {
			throw new Error('uncomplete opts: lack of scales data!');
		}

		var defaults = {
			category: {
				scaleType: 'ordinal',
				domain: null,
				range: null,
				rangeType: 'rangePoints', //band
				range: null,
				padding: 1,
				outerPadding: 0
			},
			value: {
				scaleType: 'linear',
				domain: null,
				nice: true,
				rangeType: 'range',
				range: null,
				ticks: 10
			}
		};

		var scales = _.map(opts.scales, function(item, i) {
			if(typeof(item.generator) == 'function') {
				return {key: axis.key, scale: axis.generator()};
			}

			item = _.extend({}, defaults[item.type == 'time' ? 'value' : item.type], item); //todo, defaults is read-only
			item.layout = item.layout || opts.layout;
			item.scale = makeScale(item);
			item.average = d3.mean(item.values);
			item.update = function(opts) {
				item = _.extend(item, opts);
				item.scale = makeScale(item);
				item.average = d3.mean(item.values);
			};
			//todo opts.generator = makeScale(defaults.type); write here or plot.js
			//return {key: item.key, scale: makeScale(item)};
			return item;
		});

		console.log(scales);

		return scales; //[{key: 'x', scale: d3.scale.linear()}]
	};

	function polar(opts) {
		var layout = opts.layout;
		var startR = (opts.startRatio || 0.1) * realR;
		var endR = (opts.endRatio || 0.95) * layout.r;
		var range = [startR, endR];
		var axisKeys = _.pluck(opts.data, 'key');
		var scales = [];
		var angleScale = d3.scale.ordinal()
			.domain(axisKeys)
			.rangeBands([0,2 * Math.PI]);

		var center = [layout.left + layout.r, layout.top + layout.r];
		var scales = _.map(opts.data, function(axis) {
			//console.log(key);
			return {
				key: axis.key,
				scale: {
					angle: angleScale(axis.key),
					radius: d3.scale.linear()
						.domain([d3.min(axis.values) < 0 ? d3.min(axis.values) : 0, d3.max(axis.values)])
						.range(range)
				}
			}
		});

		return {
			scales: scales,
			center: center,
			startR: startR,
			endR: endR
		}
	}

	return function(opts) { //axis opts {type: 'rectangle', layout: {}, data: [{key:'x', values:[], scale: {}}]}
		var _opts = _.clone(opts, true);
		var scaleData;

		if(_opts.type == 'rectangle') {
			scaleData = rectangle(_opts);
		}

		if(_opts.type == 'polar') {
			scaleData = polar(_opts);
		}

		return {
			get: function(key) {
				return scaleData.scales ? _.find(scaleData.scales, {key: key}).scale : _.find(scaleData, {key: key}).scale;
			},
			set: function(key, opts) {
				var currentScaleData = scaleData.scales ? _.find(scaleData.scales, {key: key}) : _.find(scaleData, {key: key});
				currentScaleData.update(opts);
				dispatcher.change(key, currentScaleData.scale);
				return currentScaleData;
			},
			dispatcher: dispatcher,
			data: scaleData
		}
	}
})