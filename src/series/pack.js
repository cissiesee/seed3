define(function(require) {
	//require('d3');
	var when = require('when');

	return function(opts) {
		/*data: [{
			name: 'series1',
			data: ...
		}],
		scales: scales,
		containers: container*/
		var defer = when.defer();
		
		opts.containers.each(function(d) {
			var seriesData = d;
			var container = d3.select(this);

			var color = opts.colors;
			var format = d.format || d3.format(",d");
			var pack = d3.layout.pack()
				.size([d.width - 4, d.height - 4])
				.value(function(d) { return d.size; });

			_.each(opts, function(v, k) {
				if(typeof(pack[k]) == 'function') {
					pack[k](v);
				}
			});

			container
				.style("width", d.width + 'px')
				.style("height", d.height + "px");

			/*console.log(d.data);

			return;*/

			var node = container.datum(d.data).selectAll(".node")
				.data(pack.nodes)
				.enter()
				.append(opts.containerTag)
				.attr({
					'class': function(d) {
						return d.children ? null : 'leaf-node';
					},
					'transform': function(d) {
						return 'translate(' + d.x + ',' + d.y + ')';
					}
				})
				.style(_.extend({
					'border': '1px solid white',
					'overflow': 'hidden',
					'position': 'absolute',
					'text-indent': '2px'
				}, d.style));

			node.append("title")
				.text(function(d) {
					return d.name + (d.children ? "" : ": " + format(d.size));
				});

			node.append("circle")
				.attr("r", function(d) {
					return d.r;
				})
				.style({
					fill: function(d) {
						return color(d.name);
					}
				});

			node
				//.filter(function(d) { return !d.children; })
				.append("text")
				.attr("dy", ".3em")
				.style("text-anchor", "middle")
				.text(function(d) {
					return d.name.substring(0, d.r / 3);
				});
		});

		return defer.promise;
	}
})