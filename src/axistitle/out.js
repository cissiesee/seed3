define(function(require) {
	var title = require('./title');

	return function(data, container) {
		var layout = data.layout;
		var titles = title(data, container);

		var style = {
			'font-size': '18px',
			'fill': '#666',
			'text-anchor': 'middle'
		};

		if(titles.x) {
			titles.x.attr({
					x: layout.width / 2 + layout.left,
					y: layout.height + 48,
					dy: '1em'
				})
				.style(style);
		}

		if(titles.y) {
			titles.y.attr({
					x: layout.left / 2,
					y: layout.top + layout.height / 2,
					//dy: '0.3em',
					transform: 'rotate(-90 ' + layout.left / 2 + ',' + (layout.top + layout.height / 2) + ')'
				})
				.style(style);
		}
	}
})