define(function(require) {
	return function(data) {
		var flags = data.flags,
			keys = data.keys,
			layout = data.layout,
			axisInfo = data.axisInfo,
			center = [layout.left + layout.r, layout.top + layout.r],
			angleScale,
			radiusScale = {},
			radialAxis,
			realR = 0.95 * layout.r,
			//axisStart = 0.1;
			axisStep = 0.2;

		var axisKeys = _.keys(axisInfo);

		angleScale = d3.scale.ordinal()
			.domain(axisKeys)
			.rangeBands([0,2 * Math.PI]);

		//console.log(keys);
		_.each(keys, function(domain, key) {
			//console.log(key);
			radiusScale[key] = d3.scale.linear()
				.domain([d3.min(domain) < 0 ? d3.min(domain) : 0, d3.max(domain)])
				.range([axisStep * realR, realR]);
		});

		radialAxis = function(container) {
			var c = container.selectAll('g')
				.data(axisKeys)
				.enter()
				.append('g')
				.attr({
					transform: function(d) {
						return 'translate(' + center[0] + ',' + center[1] + ') rotate(' + angleScale(d) * 180 / Math.PI + ')';
					}
				});

			c.append('line')
				.attr({
					x1: 0,
					y1: - realR * axisStep,
					x2: 0,
					y2: - layout.r
				});

			var textData = _.map(axisKeys, function(k, i) {
				var quadrant;
				var angle = angleScale(k);
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
					key: k,
					label: axisInfo[k].title,
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
				.data(d3.range(axisStep, 1 + axisStep, axisStep))
				.enter()
				.append('circle')
				.attr({
					cx: center[0],
					cy: center[1],
					r: function(d) {
						return d * realR;
					}
				})
				.style({
					fill: 'none',
					stroke: '#ccc'
				});
		}

		return {
			center: center,
			angle: angleScale,
			radius: radiusScale,
			radialAxis: radialAxis
		}
	}
})