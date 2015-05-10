define(function(require) {
	return function(i, data) {
		var scale = data.scaleSystem;
		var r = data.markerRadius || 4;
		var center = scale.center;

		var dot = function(container) {
			var markerContainer = container.selectAll('g.marker')
				.data(function(d) {
					return d.nodes;
				})
				.enter()
				.append('g')
				.attr({
					class: function(d) {
						return 'marker';
					},
					transform: function(d) {
						var angle = scale.angle(d.radialData.axis);
						var radius = scale.radius[d.radialData.axis](d.radialData.value);
						return 'translate(' + center[0] + ',' + center[1] + ') rotate(' + angle * 180 / Math.PI + ')';
					}
				});

			markerContainer.append('path')
				.attr({
					d: function(d) {
						return d3.svg.symbol().type(d.marker).size(256)();
					},
					transform: function(d) {
						var radius = scale.radius[d.radialData.axis](d.radialData.value);
						return 'translate(0,' + (-radius) + ')';
					},
					class: 'hover'
				})
				.style({
					stroke: function(d) {
						return d.color;
					},
					fill: '#fff',
					opacity: 0
				});

			markerContainer.append('path')
				.attr({
					d: function(d) {
						return d3.svg.symbol().type(d.marker).size(Math.pow(r * 2, 2))();
					},
					transform: function(d) {
						var radius = scale.radius[d.radialData.axis](d.radialData.value);
						return 'translate(0,' + (-radius) + ')';
					}
				})
				.style({
					stroke: function(d) {
						return d.color;
					},
					fill: function(d) {
						return d.color;
					}/*,
					opacity: function(d) {
						return d.current ? 1: 0;
					}*/
				});
		
			/*container.on('mouseover', function(d) {
				var d3this = d3.select(this);
				d3this.style({
					'stroke-width': 3
				});
			})
			.on('mouseleave', function(d) {
				var d3this = d3.select(this);
				d3this.style({
					'stroke-width': 1
				});
			});*/
		}

		return dot;
	}
})