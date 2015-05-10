define(function(require) {
	require('d3');
	//var markerMaker = require('./dot');
	return function(i, data) {
		var barWidthRatio = 0.7;
		//var marker = markerMaker(i, data);
		var scale = data.scaleSystem;

		var bar = function(container) {
			var barContainer = container.selectAll('g.bar')
				.data(function(d) {
					return d.nodes;
				})
				.enter()
				.append('g')
				.attr({
					class: 'bar marker',
					transform: function(d) {
						var x = d.x0 ? scale.x(d.x0) : scale.x.range(0),
							y = scale.y(d.y) + scale.yStep * (1 - barWidthRatio) / 2;
						return 'translate(' + x + ',' + y + ')';
					}
				});

			var rect = barContainer.append('rect')
				.attr({
					width: function(d) {
						return d.x1 ? scale.x(d.x1) - scale.x(d.x0) : scale.x(d.x);
					},
					height: function() {
						//todo simple, group, stack
						return scale.yStep * barWidthRatio;
					}
				})
				.style({
					stroke: function(d) {
						return d.color;
					},
					'stroke-width': 1,
					fill: function(d) {
						return d.color;
					},
					'fill-opacity': 0.8
				});

			//marker(container);
			return {
				bars: barContainer,
				barHeight: scale.yStep * barWidthRatio
			}
		}

		return bar;
	}
})