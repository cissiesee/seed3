define(function(require) {
	return function(i, data) {
		var r = 30;
		var scale = data.scaleSystem;
		var colorScale = data.colorScale;

		var dotConnection = function(container) {
			container.datum(function(d) {
				var prev = _.find(d.nodes, {period: 1});
				var now = _.find(d.nodes, {period: 0});

				var dx = now.x - prev.x;
				var dy = now.y - prev.y;
				var quadrant;

				if(dx > 0 && dy >= 0) {
					quadrant = 1;
				} else if(dx <= 0 && dy > 0) {
					quadrant = 2;
				} else if(dx < 0 && dy <=0) {
					quadrant = 3;
				} else if(dx >= 0 && dy < 0) {
					quadrant = 4;
				}
				var radian = Math.atan(Math.abs(dy) / Math.abs(dx));
				var startDx = Math.cos(radian) * r;
				var startDy = Math.sin(radian) * r;
				var arrowOffset = 10;
				var finishDx = Math.cos(radian) * (r + arrowOffset);
				var finishDy = Math.sin(radian) * (r + arrowOffset);
				var startOffset = {};
				var finishOffset = {};
				var angle = radian / Math.PI * 180;

				switch(quadrant) {
					case 1:
						startOffset.x = startDx;
						startOffset.y = -startDy;
						finishOffset.x = finishDx;
						finishOffset.y = -finishDy;
						d.angle = angle;
						break;
					case 2:
						startOffset.x = -startDx;
						startOffset.y = -startDy;
						finishOffset.x = -finishDx;
						finishOffset.y = -finishDy;
						d.angle = 180 - angle;
						break;
					case 3:
						startOffset.x = -startDx;
						startOffset.y = startDy;
						finishOffset.x = -finishDx;
						finishOffset.y = finishDy;
						d.angle = angle + 180;
						break;
					case 4:
						startOffset.x = startDx;
						startOffset.y = startDy;
						finishOffset.x = finishDx;
						finishOffset.y = finishDy;
						d.angle = 360 - angle;
						break;
				}

				d.arrowStart = {
					x: scale.x(prev.x) + startOffset.x,
					y: scale.y(prev.y) + startOffset.y
				};
				d.arrowFinish = {
					x: scale.x(now.x) - finishOffset.x,
					y: scale.y(now.y) - finishOffset.y
				};

				return d;
			});

			//connection line
			var arrow = container.append('g')
				.attr({
					class: 'connection-arrow'
				});

			arrow.append('line')
				.attr({
					class: 'connection-line',
					x1: function(d) {
						return d.arrowStart.x;
					},
					y1: function(d) {
						return d.arrowStart.y;
					},
					x2: function(d) {
						return d.arrowFinish.x;
					},
					y2: function(d) {
						return d.arrowFinish.y;
					}
				})
				.style({
					stroke: function(d) {
						return d.color;
					},
					'stroke-width': 8
				});

			arrow.append('g')
				.attr({
					class: 'arrow-c',
					transform: function(d) {
						return 'translate(' + d.arrowFinish.x + ',' + d.arrowFinish.y + ')';
					}
				})
				.append('path')
				.attr({
					class: 'arrow-symbol',
					d: d3.svg.symbol().type('triangle-up').size(100),
					transform: function(d) {
						return 'rotate(' + ( 90 - d.angle) + ')';
					}
				})
				.style({
					fill: function(d) {
						return d.color;
					}
				})

			//node
			var dot = container.selectAll('g.dot')
				.data(function(d) {
					return d.nodes;
				})
				.enter()
				.append('g')
				.attr({
					class: function(d) {
						return 'marker dot';
					},
					transform: function(d) {
						return 'translate(' + scale.x(d.x) + ',' + scale.y(d.y) + ')';
					}
				});

			dot.append('path')
				.attr({
					d: function(d) {
						var symbolType = d.current ? 'triangle-up' : 'circle';
						return d3.svg.symbol().type(symbolType).size(Math.pow(r * 2,2))();
					}
				})
				.style({
					stroke : function(d) {
						return d.color;
					},
					'stroke-width': 3,
					'stroke-dasharray': function(d) {
						return d.period == 1 ? '15,6': 'none';
					},
					fill: function(d) {
						return d.period == 1 ? '#fff': d.color;
					},
					'fill-opacity': 0.6
				});

			//text
			dot.append('text')
				.attr({
					class: 'text-shadow',
					dy: '0.3em'
				})
				.text(function(d) {
					return d.label;
				})
				.style({
					'stroke' :'#fff',
					'stroke-width': '5px',
					'text-anchor': 'middle',
					'font-size': '14px',
					'fill': '#fff'
				});

			dot.append('text')
				.attr({
					class: 'text',
					dy: '0.3em'
				})
				.text(function(d) {
					return d.label;
				})
				.style({
					'text-anchor': 'middle',
					//'font-weight': 'bold',
					'font-size': '14px',
					//'text-shadow': '-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white',
					'fill': function(d) {
						return d.period == 1 ? d.color : '#666';
					}
				});
		}

		return dotConnection;
	}
})