define(function(require) {
	return function(data) {
		var flags = data.flags,
			keys = data.keys,
			layout = data.layout;

		var xScale = d3.scale.linear()
			.domain([d3.min(keys.x) < 0 ? d3.min(keys.x) : 0, d3.max(keys.x)])
			.nice()
			.range([layout.left, layout.width + layout.left]);

		var yScale = d3.scale.linear()
			.domain([d3.min(keys.y) < 0 ? d3.min(keys.y) : 0, d3.max(keys.y)])
			.nice()
			.range([layout.top + layout.height, layout.top]);

		var xAxis, yAxis;

		if(flags.xAxis) {
			xAxis = d3.svg.axis()
				.scale(xScale)
				.tickSize(-layout.width)
				.tickPadding(5)
				.orient('bottom');
		}

		if(flags.yAxis) {
			yAxis = d3.svg.axis()
				.scale(yScale)
				.tickSize(-layout.height)
				.tickPadding(5)
				.orient('left');
		}

		return {
			x: xScale,
			y: yScale,
			xAxis: {
				generator: xAxis,
				transform: 'translate(0,' + (layout.top + layout.height) + ')'
			},
			yAxis: {
				generator: yAxis,
				transform: 'translate(' + layout.left + ',0)'
			}
		}
	}
})