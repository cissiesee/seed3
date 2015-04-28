define(function(require) {
	var tooltip = require('./tooltip');

	return function(chartObj, opts) {
		var container = chartObj.container;
		var currentTip = new Tooltip(container.node(), {
			id: 'current-tip'
		});
		var mouseTip = new Tooltip(container.node(), {
			id:'mouse-tip',
			transition: false
		});

		if(opts.template) {
			tooltip.setTpl(opts.template);
		}

		var tipline = chartObj.scaleZone.append('line')
			.attr({
				x1: x(_.last(chartObj.keys.x)),
				y1: y(0),
				x2: x(_.last(chartObj.keys.x)),
				y2: chartObj.yMax
			})
			.style({
				'stroke-dasharray': '5,5'
			});

		var lastPositionX = 0;
		container
			.on('mouseenter', function() {

			})
			.on('mousemove', function() {
				var currentMouse = d3.mouse(canvas.node()),
					currentX = currentMouse[0],
					currentY = currentMouse[1];

				if(currentY > y(0) || currentY < yMax) {
					return;
				}
				var xIndex = (_.sortedIndex(x.range(), currentX - xStep / 2));
				var key = x.domain()[xIndex];
				if(!key || key == lastPositionX) {
					return;
				}
				setCurrent(key);
			})
			.on('mouseleave', function(d) {
				setCurrent(data.config.currentY);
				//markers.classed('selected', false);
				//d3.select(this).select('line').style('visibility', 'hidden');
			});

		function setCurrent(key) {
			lastPositionX = key;
			markers.classed('selected', false);
			tipline
				//.transition()
				//.ease('linear')
				//.duration(200)
				.attr({
					x1: x(key),
					x2: x(key)
				});

			mouseTip.hide();

			markers.each(function(d) {
				var d3this = d3.select(this);
				if(d.x == key) {
					d3this.classed('selected', true);
					if(d3this.attr('class').match(/current/)) {
						//console.log(currentTip);
						currentTip.update(d, [x(d.x) + 10, y(d.y)]).show();
					}
				}
			});
		}
	}
})