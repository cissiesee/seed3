define(function(require) {
	require('d3');
	var when = require('when');
	//var scatter = require('./scatter');

	return function(opts) {
		//var defer = when.defer();
		var scales = opts.scales;
		//var datas = opts.containers.data();

		function updateAttr() {
			if(!this.size()) {
				return;
			}
			this.transition()
				.attr({
					'transform': function(d) {
						return 'translate(' + scales.get('x')(d.node.x)  + ',' + scales.get('y')(d.node.y1 || d.node.y)+')';
					}
				});
		}

		function updateStyle(currents, data) {
			if(!currents.size()) {
				return;
			}
			currents.each(function(d) {
				d.color = data.color;
				var marker = data.marker;
				var style = _.extend({'stroke': d.color, 'fill': d.color}, data.style, marker.style);
				d3.select(this).style(style);
			});
		}

		function updateGraph() {
			opts.containers.each(function(data) {
				//var currentData = d ? [d] : [];

				var currentDots = d3.select(this).selectAll('g.scatter');

				if(!currentDots.size()) {
					currentDots = currentDots
						.data(data.data)
						.enter().append('g')
						.attr({
							'class': 'scatter',
							'transform': function(d) {
								return 'translate(' + scales.get('x')(d.node.x)  + ',' + scales.get('y')(0)+')';
							}
						});

					currentDots.append('path')
						.attr({
							d: function(d) {
								return d3.svg.symbol().type(data.marker.type).size(256)();
							},
							class: 'hover'
						})
						.style({
							opacity: 0
						});

					currentDots.append('path')
						.attr({
							d: function(d) {
								var marker = data.marker;
								marker.r = typeof(marker.r) == 'function' ? marker.r(d.node) : marker.r;
								return d3.svg.symbol().type(marker.type).size(Math.pow(marker.r * 2, 2))();
							} 
						})
						.each(function(d) {
							d.color = data.color;
							var marker = data.marker;
							var style = _.extend({'stroke': d.color, 'fill': d.color}, data.style, marker.style);
							d3.select(this).style(style);
						});
				}

				if(data.show === false) {
					currentDots
						//.data(currentData)
						.transition()
						.attr({
							'transform': function(d) {
								return 'translate(' + scales.get('x')(d.node.x)  + ',' + scales.get('y')(d.node.y0 === undefined ? 0 : d.node.y0)+')';
							}
						})
						.style({
							opacity: 0
						});
				} else {
					currentDots
						.style({
							opacity: 1
						})
						.call(updateAttr);

					updateStyle(currentDots, data);
				}
			});
		}

		updateGraph();

		//defer.resolve();

		/*lines(opts).then(function(result) {
			defer.resolve({
				setData: function(datas) {
					//datas = data;
					handleStack();
					updateGraph(datas);
				}
			});
		});*/

		//return defer.promise;
		return {

		}
	}
})