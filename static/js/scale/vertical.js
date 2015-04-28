define(function(require) {
	return function(data) {
		var stringDefaults = {
			divideType: 'point', //'band'
			round: false,
			padding: 1,
			outerPadding: 0
		};
		var numberDefaults = {
			//divideType: 'Points', //'Bands'
			round: false
		};
		var defaults = {
			rangeType: 'range', //rangeBands, rangePoints
			padding: 1,
			outPadding: 0,
			sort: {}//d3.ascending, d3.descending
			//valueMin: 0
		};
		var theme = _.extend(defaults, data.scale.opts);
		var flags = data.flags,
			keys = data.keys,
			layout = data.layout,
			axisInfo = data.axisInfo,
			xDomain = theme.sort.x ? keys.x.sort(theme.sort.x) : keys.x,
			yDomain = [theme.valueMin == undefined ? d3.min(keys.y) : theme.valueMin, d3.max(keys.y)],
			yDomain = theme.sort.y ? yDomain.sort(theme.sort.y) : yDomain;

		_.extend(axisInfo);

		var xScale, yScale, xAxis, yAxis, xStep, yMax;

		axisInfo.xxScale = d3.scale.ordinal()
			.domain(keys.x);
			//.rangePoints([layout.left, layout.width + layout.left], 1);
		xScale[theme.rangeType]([layout.left, layout.width + layout.left], theme.padding, theme.outPadding);
		
		xStep = xScale.rangeBand || xScale.range()[1] - xScale.range()[0];

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