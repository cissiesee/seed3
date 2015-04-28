define(function(require) {
	return function(data) {
		var flags = data.flags,
			keys = data.keys,
			layout = data.layout,
			axisconfig = data.axisInfo,
			xDomain;

		var xScale, yScale, xAxis, yAxis, xStep, yStep, xFirst, xLast, yFirst, yLast;

		if(!keys.x) {
			var xs = _.filter(keys, function(v, k) {
				return k.match('x');
			});
			data.keys.x = d3.merge(xs);
		}

		xDomain = [d3.min(keys.x) < 0 ? d3.min(keys.x) : 0, d3.max(keys.x)];

		xScale = d3.scale.linear()
			.domain(xDomain)
			.range([layout.left, layout.width + layout.left]);
		xStep = xScale.range()[1] - xScale.range()[0];
		xFirst = xScale(xDomain[0]);
		xLast = xScale(xDomain[1]);

		yScale = d3.scale.ordinal()
			.domain(keys.y)
			.rangeBands([layout.top + layout.height, layout.top]);
		yStep = yScale.rangeBand();
		yFirst = yScale(keys.y[0]);
		yLast = yScale(_.last(keys.y));

		if(flags.axis.x) {
			xAxis = {
				generator: d3.svg.axis()
					.scale(xScale)
					.tickPadding(5)
					.tickSize(-layout.height)
					.orient('bottom'),
				transform: 'translate(0,' + (layout.top + layout.height) + ')'
			}
		}

		if(flags.axis.y) {
			yAxis = {
				generator: d3.svg.axis()
					.scale(yScale)
					//.tickSize(-layout.width)
					.tickPadding(5)
					.orient('left'),
				transform: 'translate(' + layout.left + ',0)'
			}
		}

		return {
			x: xScale,
			xStep: xStep,
			xFirst: xFirst,
			xLast: xLast,
			y: yScale,
			yStep: yStep,
			yFirst: yFirst,
			yLast: yLast,
			xAxis: xAxis,
			yAxis: yAxis,
		}
	}
})