define(function(require) {
	var scale = require('./horizontal_down');
	return function(data) {
		var horizontal = scale(data);
		var flags = data.flags,
			keys = data.keys,
			layout = data.layout,
			axisconfig = data.originalData.config.axis,
			yearDomain = d3.extent(keys.x);

		//console.log(d3.extent(keys.x));
		
		horizontal.x = d3.scale.linear()
			//.ticks(d3.time.year, 1)
			.domain(yearDomain)
			//.ticks(d3.time.year, 1)
			.range([layout.left, layout.width + layout.left]);
		horizontal.xStep = horizontal.x.range()[1] - horizontal.x.range()[0];
		horizontal.xFirst = horizontal.x(yearDomain[0]);
		horizontal.xLast = horizontal.x(yearDomain[1]);

		if(flags.axis.x) {
			horizontal.xAxis = {
				generator: d3.svg.axis()
					.scale(horizontal.x)
					.ticks(yearDomain[1] - yearDomain[0] + 1)
					.tickPadding(5)
					.tickFormat(function(d) {
						return d;
					})
					.tickSize(-layout.height)
					.orient('top'),
				transform: 'translate(0,' + layout.top + ')'
			}
		}

		return horizontal;
	}
})