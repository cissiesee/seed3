define(function(require) {
	require('d3');
	var markerMaker = require('./dot_radial');
	return function(data, i, scale) {
		var marker = markerMaker(i, data);
		//var scale = data.scaleSystem;
		var center = scale.center;
		var path = d3.svg.line.radial()
			.radius(function(d) {
				var radius = scale.radius[d.radialData.axis](d.radialData.value);
				return radius;
			})
			.angle(function(d,i) {
				var angle = scale.angle(d.radialData.axis);
				return angle;
			});

		var line = function(container) {
			container.append('path')
				.attr({
					d: function(d) {
						return path(d.nodes) + 'Z';
					},
					transform: 'translate(' + center[0] + ',' + center[1] + ')'
				})
				.style({
					stroke: function(d) {
						return d.color;
					},
					'stroke-width': 1,
					fill: function(d) {
						//return 'none';
						return d.color;
					},
					'fill-opacity': 0.3
				})
				.on('mouseover', function() {
					var d3this = d3.select(this);
					d3this.style({
						'fill-opacity': 0.5
					});
				})
				.on('mouseleave', function() {
					var d3this = d3.select(this);
					d3this.style({
						'fill-opacity': 0.3
					});
				})

			marker(container);
		}

		return line;
	}
})