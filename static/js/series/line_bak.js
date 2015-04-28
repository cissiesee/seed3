define(function(require) {
	require('d3');
	var when = require('when');
	var markerMaker = require('./dot');
	return function(opts) { //d:seriesopts {data: [nodes], style:{}}
		/*
		d = 	
			node: {x:, y:, style: {}, marker: {}, markerPoint: {}}, 
			originalData...
		},
		opts = {
			data: [{
				node: {x: 1, y:2},
				originalData...
			}],
			type: 'line', 
			scales: scales, 
			container: container, 
			totalItems: 4, 
			index: 3, 
			stackItems: 2, 
			stackIndex: 1, 
			seriesWidthRatio: 0.8
		}*/
		var data = opts.data;
		var marker = markerMaker(opts);
		var scales = opts.scales;
		var style = _.extend({'stroke': opts.color, 'fill': 'none'}, opts.style);
		var path = d3.svg.line()
			.x(function(d) {
				return scales.get('x')(d.x);
			})
			.y(function(d) {
				return scales.get('y')(d.y);
			});

		var line = function(container) {
			var defer = when.defer();

			//todo report bug to d3: d3.select(d3object) should still be an normal d3 object
			container.append('path')
				.attr({
					d: function(d) {
						return path(_.map(d.data, function(item) {
								return item.node;
							})
						);
					}
				})
				.style(style);

			defer.resolve(); //result is needed

			marker(container);

			return defer.promise;
		}

		return line;
	}
})