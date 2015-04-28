define(function(require) {
	var scale = require('./horizontal');
	return function(data) {
		var horizontal = scale(data),
			flags = data.flags,
			keys = data.keys,
			layout = data.layout,
			axisconfig = data.axisInfo;

		horizontal.y = d3.scale.ordinal()
			.domain(keys.y)
			.rangeBands([layout.top, layout.top + layout.height]);
		horizontal.yStep = horizontal.y.rangeBand();
		horizontal.yFirst = horizontal.y(keys.y[0]);
		horizontal.yLast = horizontal.y(_.last(keys.y));

		if(flags.axis.x) {
			horizontal.xAxis = {
				generator: d3.svg.axis()
					.scale(horizontal.x)
					.tickPadding(5)
					.orient('top'),
				transform: 'translate(0,' + layout.top + ')'
			}
		}

		if(flags.axis.y) {
			horizontal.yAxis.generator.scale(horizontal.y);
		}

		return horizontal;
	}
})