define(function(require) {
	return function(data, scaleOpts) {
		var ordinalDefaults = {
			rangeType: 'point', //'band'
			round: false,
			padding: 1,
			outerPadding: 0,
			sort: 'dsc', //'asc', func
			format: func
		};
		var linearDefaults = {
			//divideType: 'Points', //'Bands'
			//reverse: true, //coordinate vs data
			round: false,
			sort: 'dsc', //'asc', func
			format: func,
			valueMin: null, //data for func
			valueMax: null //data for func
		};
		var scale = {}, axes = {};
		var theme;
		theme = _.extend(theme, defaults, scaleOpts);

		_.each(theme, function(info, key) {
			var domain = info.sort ? keys[key].sort(typeof(info.sort) == 'function' ? info.sort : null) : keys[key];
			var range;
			switch(key) {
				case 'x':
					range = [layout.left, layout.width + layout.left];
					break;
				case 'y':
					range = [layout.top + layout.height, layout.top];
			}
			if(info.type == 'number') {
				info = _.extend(numberDefaults, info);
				scale[key] = d3.scale.linear()
					.domain(domain);
				scale[key]['range' + info.round ? 'Round' : '']()
			}
			if(info.type == 'string') {
				info = _.extend(stringConfig, info);
			}
		})


		/*<_<!*/
		var defaults = {
			x: {
				type: 'string'
			},
			y: {
				type: 'number'
			}
		};

		var flags = data.flags,
			keys = data.keys,
			layout = data.layout,
			axisInfo = data.axisInfo;

		_.each(theme, function(info, key) {
			var domain = info.sort ? keys[key].sort(typeof(info.sort) == 'function' ? info.sort : null) : keys[key];
			var range;
			switch(key) {
				case 'x':
					range = [layout.left, layout.width + layout.left];
					break;
				case 'y':
					range = [layout.top + layout.height, layout.top];
			}
			if(info.type == 'number') {
				info = _.extend(numberDefaults, info);
				scale[key] = d3.scale.linear()
					.domain(domain);
				scale[key]['range' + info.round ? 'Round' : '']()
			}
			if(info.type == 'string') {
				info = _.extend(stringConfig, info);
			}
		})

		if(scaleOpts) {
			_.each(scaleOpts, function(info, key) {
				if(info.type == 'number') {
					_.extend(numberConfig, numberDefaults, info);
				}
				if(info.type == 'string') {
					_.extend(stringConfig, stringDefaults, info);
				}
			});			
		}

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

		axisInfo.xScale = d3.scale.ordinal()
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