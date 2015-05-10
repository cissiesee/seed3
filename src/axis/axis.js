var _ = require('lodash');
var utils = require('../utils');

function makeAxisGenerator(axis, scales) {
	var generator = d3.svg.axis()
		.scale(scales.get(axis.key))
		.orient(axis.key == 'x' ? 'bottom' : 'left');

	if(axis.generator) {
		return axis.generator;
	}

	_.each(axis, function(value, key) {
		if(key == 'generator') {
			return;
		}
		if(typeof(generator[key]) == 'function') {
			generator[key](value);
		}
	});

	return generator;
}

function getLayout(scales) {
	var xScale = scales.get('x');
	var yScale = scales.get('y');
	var xRange = xScale.rangeExtent ? xScale.rangeExtent() : xScale.range();
	var yRange = yScale.rangeExtent ? yScale.rangeExtent() : yScale.range();

	return {
		left: d3.min(xRange),
		top: d3.min(yRange),
		right: d3.max(xRange),
		bottom: d3.max(yRange)
	}
}

function makeTranslate(axes, scales) {
	var layout = getLayout(scales);
	var xScale = scales.get('x');
	var yScale = scales.get('y');
	var xOpts = _.find(axes, {key: 'x'});
	var yOpts = _.find(axes, {key: 'y'});

	return {
		x: function() {
			var offset;
			if(yOpts.type == 'value') {
				offset = yScale(0);
			}
			if(yOpts.type == 'category') {
				offset = xOpts.orient == 'top' ? layout.top : layout.bottom;
			}
			return '0,' + offset;
		},
		y: function() {
			var offset;
			if(xOpts.type == 'value') {
				offset = xScale(0);
			}
			if(xOpts.type == 'category') {
				offset = yOpts.orient == 'right' ? layout.right : layout.left;
			}
			return offset + ',0';
		}
	}
}
var axisMaker = {
	rectangle: function(opts) {
		return function(container) {
			//grid bg
			if(opts.grid) {
				var layout = getLayout(opts.scales);
				container.append('rect')
					.attr({
						'class': 'axis-bg',
						'transform': d3.helper.setTransform({translate: layout.left + ',' + layout.top}),
						'width': layout.right - layout.left,
						'height': layout.bottom - layout.top
					})
					.style(opts.grid.style);
			}

			var axisObj = {};

			_.each(opts.axes, function(axis, i) {
				var axisGenerator = makeAxisGenerator(axis, opts.scales);
				
				var axisDom = container.append('g')
					.attr({
						/*'id': function(d, i) {
							return 'axis-' + axis.key + '-' + i;
						},*/
						'class': 'axis axis-' + axis.key,
						'transform': d3.helper.setTransform({translate: makeTranslate(opts.axes, opts.scales)[axis.key]()})
					})
					.call(axisGenerator);

				axisObj[axis.key] = {
					ele: axisDom,
					generator: axisGenerator
				};

				if(axis.stripeBg) {
					//todo
				}

				if(axis.grid || axis.tickLine) {
					container.append('rect')
					//todo draw line
					return;
				}
				if(axis.type == 'value') {
					//todo axisDom.append('line'), '0' line
				}
			});



			return {
				get: function(key) {
					return axisObj[key];
				},
				update: function(key, scale) {
					var newGenerator = axisObj[key].generator.scale(scale);
					axisObj[key].ele.transition().call(newGenerator);
				}
			}
		}
	},
	polar: function(opts) {
		return function(container) {
			var axisKeys = _.pluck(opts.data, 'key');
			//var scales = ;
			var center = scales.data.center;
			var r = scales.data.r;
			var c = container.selectAll('g')
				.data(axisKeys)
				.enter()
				.append('g')
				.attr({
					transform: function(d) {
						var scale = scales.get(d);
						var start = scale.start;
						return 'translate(' + start[0] + ',' + start[1] + ') rotate(' + scale.angle(d) * 180 / Math.PI + ')';
					}
				});

			if(opts.tickLine) {
				c.append('line')
					.attr({
						x1: 0,
						y1: function(d) {
							var scale = scales.get(d);
							return d3.min(scale.radius.range());
						},
						x2: 0,
						y2: - r
					});
			}

			var textData = _.map(opts.data, function(axis, i) {
				var quadrant;
				var angle = scales.get(axis.key).angle;
				var absx = Math.abs(Math.sin(angle) * layout.r);
				var absy = Math.abs(Math.cos(angle) * layout.r);

				if(angle >= 0 && angle <= Math.PI / 2) {
					quadrant = 1;
				} else if (angle > Math.PI / 2 && angle <= Math.PI) {
					quadrant = 2;
				} else if (angle > Math.PI && angle < Math.PI * 3 / 2) {
					quadrant = 3;
				} else if (angle > Math.PI * 3 / 2 && angle < Math.PI * 2) {
					quadrant = 4;
				}
				return {
					key: axis.key,
					label: axis.title,
					quadrant: quadrant,
					angle: angle,
					x: /1|2/.test(quadrant) ? absx : -absx,
					y: /1|4/.test(quadrant) ? -absy : absy
				}
			});

			container.append('g')
				.attr({
					class: 'axis-text',
					transform: 'translate(' + center[0] + ',' + center[1] + ')'
				})
				.selectAll('text')
				.data(textData)
				.enter()
				.append('text')
				.text(function(d) {
					return d.label;
				})
				.attr({
					x: function(d) {
						return d.x;
					},
					y: function(d) {
						return d.y;
					},
					dy: function(d) {
						return /2|3/.test(d.quadrant) ? '1.5em' : '-1em';
					},
					transform: function(d) {
						var textRotate = (/2|3/.test(d.quadrant) ? 180 + d.angle * 180 / Math.PI : d.angle * 180 / Math.PI);
						return 'rotate(' + textRotate + ' ' + d.x + ',' + d.y + ')';
					}
				})
				.style({
					'text-anchor':'middle',
					'font-size': '12px'
				});

			container.selectAll('circle')
				.data(d3.range(scales.startR, 1 + scales.startR, (scales.endR - scales.startR) / opts.ticks))
				.enter()
				.append('circle')
				.attr({
					cx: center[0],
					cy: center[1],
					r: function(d) {
						return d * scales.data.realR;
					}
				})
				.style({
					fill: 'none',
					stroke: '#ccc'
				});
		}
	}
};

module.exports = function(opts) { //axisopts {type: 'rectangle', grid: true, data: [{key: 'x', scale: , opts(show)}]}
	return axisMaker[opts.type](opts);
}