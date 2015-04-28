define(function(require) {
	return function(data) {
		var flags = data.flags,
			keys = data.keys,
			layout = data.layout,
			axisconfig = data.originalData.config.axis;

		var xScale, yScale, xAxis, yAxis, xStep, yMax;

		xScale = d3.scale.ordinal()
			.domain(keys.x)
			.rangePoints([layout.left, layout.width + layout.left], 1);
		xStep = xScale.range()[1] - xScale.range()[0];

		yScale = d3.scale.linear()
			.domain([d3.min(keys.y) < 0 ? d3.min(keys.y) : 0, d3.max(keys.y)])
			.nice()
			.range([layout.top + layout.height, layout.top]);
		yMax = yScale.range()[1];

		if(flags.axis.x) {
			xAxis = {
				generator: d3.svg.axis()
					.scale(xScale)
					.tickPadding(5)
					.tickFormat(data.xFormat||function(d) {return d;})
					.orient('bottom'),
				transform: 'translate(0,' + (layout.top + layout.height) + ')'
			}
		}

		if(flags.axis.y) {
			yAxis = {
				generator: d3.svg.axis()
					.scale(yScale)
					.tickSize(-layout.width)
					.tickPadding(5)
					.tickFormat(data.yFormat||function(d) {return d;})
					.orient('left'),
				transform: 'translate(' + layout.left + ',0)'
			}
		}

		return {
			x: xScale,
			xStep: xStep,
			y: yScale,
			yMax: yMax,
			xAxis: xAxis,
			yAxis: yAxis
		}
	}
})