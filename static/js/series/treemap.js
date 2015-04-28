define(function(require) {
	require('d3');
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
			var treemap = d3.layout.treemap()
				.size([d.width, d.height])
				.sticky(true)
				//.mode('squarify')
				.value(function(d) { return d.size; });

			_.each(opts, function(v, k) {
				if(typeof(treemap[k]) == 'function') {
					treemap[k](v);
				}
			});

			container
				.style("width", d.width + 'px')
				.style("height", d.height + "px");

			var node = container.datum(d.data).selectAll(".node")
				.data(treemap.nodes)
				.enter()
				.append(opts.containerTag)
				.attr({
					'class': function(d) {
						return d.children ? null : 'leaf-node';
					}
				})
				.style({
					'left': function(d) {
						return (d.x + seriesData.left) + "px";
					},
					'top': function(d) {
						return (d.y + seriesData.top) + "px";
					},
					'width': function(d) {
						return Math.max(0, d.dx - 1) + "px";
					},
					'height': function(d) {
						return Math.max(0, d.dy - 1) + "px";
					}
				})
				.style("background", function(d) {
					if(!d.children) {
						d.color = color(d.parent.name);
						return d.color;
					}
					return 'none';
				})
				.text(function(d) {
					return d.children ? null : d.name;
				})
				.style(_.extend({
					'border': '1px solid white',
					'overflow': 'hidden',
					'position': 'absolute',
					'text-indent': '2px'
				}, d.style))
		});

		return defer.promise;
	}
})