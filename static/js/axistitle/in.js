define(function(require) {
	var title = require('./title');

	return function(data, container) {
		var layout = data.layout;
		var titles = title(data, container);

		var style = {
			'font-size': '40px',
			'font-weight': 'bold',
			'opacity': 0.2,
			'fill': '#666',
			'text-transform': 'capitalize'
		};

		if(titles.x) {
			titles.x.attr({
					x: layout.width + layout.left - 3,
					y: layout.top + layout.height - 45,
					dy: '1em'
				})
				.style(_.extend(style, {'text-anchor': 'end'}));
		}

		if(titles.y) {
			titles.y.attr({
				x: layout.left + 10,
				y: layout.top,
				transform: 'rotate(90 ' + (layout.left + 10) + ',' + layout.top + ')'
			})
			.style(_.extend(style, {'text-anchor': 'start'}));
		}
	}
})