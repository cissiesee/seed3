define(function(require) {
	var legend = require('./legend');

	return function(chartObj, opts) {
		var legendObj = legend(chartObj, opts);
		var _data = chartObj.data;
		var layout = _data.layout;
		var span = opts.span || 2;

		legendObj.container
			.attr({
				transform: 'translate(' + layout.left + ',' + (layout.height + layout.top + opts.margin.top) + ')'
			});

		legendObj.bg
			.attr({
				width: layout.width,
				height: layout.height
			})
			.style({
				fill: 'none'
			});

		legendObj.items
			.attr({
				transform: function(d, i) {
					var colIndex = i % span,
						rowIndex = Math.floor(i / span);
					return 'translate(' + (colIndex * layout.width / span) + ',' + (rowIndex * 30 + 20) + ')';
				}
			});

		return legendObj;
	}
})