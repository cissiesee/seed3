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
			var force = d3.layout.force()
				.charge(-120)
				.linkDistance(30)
				.size([d.width, d.height]);

			_.each(opts, function(v, k) {
				if(typeof(force[k]) == 'function') {
					force[k](v);
				}
			});

			container
				.style("width", d.width + 'px')
				.style("height", d.height + "px");

			/*console.log(d.data);

			return;*/

			force
				.nodes(d.data.nodes)
				.links(d.data.links)
				.start();

			var linkContainer = container.selectAll(".link")
				.data(d.data.links)
				.enter().append("g")
				.attr("class", "link-container");

			var link = linkContainer.append('line')
				.style("stroke-width", function(d) { return Math.sqrt(d.value); })
				.style(d.style);

			var nodeContainer = container.selectAll(".node")
				.data(d.data.nodes)
				.enter()
				.append('g')
				.attr("class", "node-container")

				/*var node = nodeContainer.append("circle")
					.attr("r", 5)
					.style("fill", function(d) { return color(d.group); })
					.call(force.drag);

				node.append("title")
					.text(function(d) { return d.name; });*/

			nodeContainer.each(function(d) {
				console.log(d);
				//return;
				var pack = d3.layout.pack()
				.value(function(d) { return d.size; });
				pack.size([5,5]);
				var d3this = d3.select(this);
				var node = d3this.datum(d).selectAll(".node")
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

			});

			force.on("tick", function() {
				linkContainer.attr({
					'transform': function(d) {
						return d3.helper.setTransform({
							translate: d.source.x + ',' + d.source.y
						});
					}
				});
				link.attr("x1", function(d) {
						return 0;
					})
					.attr("y1", function(d) {
						return 0;
					})
					.attr("x2", function(d) {
						return d.target.x - d.source.x;
					})
					.attr("y2", function(d) {
						return d.target.y - d.source.y;
					});

				nodeContainer.attr({
					'transform': function(d) {
						return d3.helper.setTransform({
							translate: d.x + ',' + d.y
						});
					}
				});
			});
		});

		return defer.promise;
	}
})