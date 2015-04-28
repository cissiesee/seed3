define(function(require) {
	return function(data) {
		var flags = data.flags,
			keys = data.keys,
			layout = data.layout,
			axisconfig = data.originalData.config.axis;

		var xScale, yScale, xAxis, yAxis, xStep, yStep;

		xScale = d3.scale.ordinal()
			.domain(keys.x)
			.rangeBands([layout.left, layout.width + layout.left]);
		xStep = xScale.rangeBand();

		yScale = d3.scale.ordinal()
			.domain(keys.y)
			.rangeBands([layout.top + layout.height, layout.top]);
		yStep = yScale.rangeBand();

		if(flags.axis.x) {
			xAxis = {
				generator: d3.svg.axis()
					.scale(xScale)
					.tickPadding(5)
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
					.orient('left'),
				transform: 'translate(' + layout.left + ',0)'
			}
		}

		return {
			x: xScale,
			xStep: xStep,
			y: yScale,
			yStep: yStep,
			xAxis: xAxis,
			yAxis: yAxis
		}
	}
})