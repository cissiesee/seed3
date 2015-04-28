define(function(require) {
	var legend = require('./legend');

	return function(chartObj, opts) {
		var legendObj = legend(chartObj, opts);

		var _data = chartObj.data;
		var layout = _data.layout;

		legendObj.container
			.attr({
				transform: 'translate(' + (layout.left + (layout.r * 2 || layout.width) + opts.margin.left) + ',' + layout.top + ')'
			});

		legendObj.bg
			.attr({
				width: opts.width,
				height: layout.height
			})
			.style({
				fill: opts.bgColor
			});

		legendObj.container.append('text')
			.attr({
				class: 'legend-title',
				x: opts.padding.left,
				y: opts.padding.top,
				dy: '1em'
			})
			.text('Legend')
			.style({
				'font-size': '20px'
			});

		legendObj.items
			.attr({
				transform: function(d, i) {
					return 'translate(' + opts.padding.left + ',' + (opts.padding.top + 50 + i * 30) + ')';
				}
			});

		return legendObj;
	}
})