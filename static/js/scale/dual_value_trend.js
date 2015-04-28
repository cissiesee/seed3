define(function(require) {
	return function(data) {
		var flags = data.flags,
			keys = data.keys,
			layout = data.layout;

		var xDomain = [d3.min(keys.x) < 0 ? d3.min(keys.x) : 0, d3.max(keys.x) * 1.1];
		var yDomain = [d3.min(keys.y) < 0 ? d3.min(keys.y) : 0, d3.max(keys.y) * 1.1];

		var xScale = d3.scale.linear()
			.domain(xDomain)
			.range([layout.left, layout.width + layout.left]);

		var yScale = d3.scale.linear()
			.domain(yDomain)
			.range([layout.top + layout.height, layout.top]);

		var xAxis, yAxis;

		function getAxisValues(domain) {
			var s = d3.scale.ordinal().domain([1,2,3,4,5,6,7,8,9,10]).rangePoints(domain);
			return s.range();
		}

		if(flags.axis.x) {
			xAxis = {
				generator: d3.svg.axis()
					.scale(xScale)
					.tickSize(-layout.width)
					.tickValues(getAxisValues(xDomain))
					.tickPadding(5)
					.tickFormat(function(d, i) {
						if(i === 0) {
							return 'low';
						}
						if(i === 9) {
							return 'high';
						}
						return '';
					})
					.orient('bottom'),
				transform: 'translate(0,' + (layout.top + layout.height) + ')'
			}
		}

		if(flags.axis.y) {
			yAxis = {
				generator: d3.svg.axis()
					.scale(yScale)
					.tickSize(-layout.height)
					.tickValues(getAxisValues(yDomain))
					.tickFormat(function(d, i) {
						if(i === 9) {
							return 'high';
						}
						return '';
					})
					.tickPadding(5)
					.orient('left'),
				transform: 'translate(' + layout.left + ',0)'
			} 
		}

		return {
			x: xScale,
			y: yScale,
			xAxis: xAxis,
			yAxis: yAxis
		}
	}
})