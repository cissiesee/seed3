//require('d3');
var _ = require('lodash');
var when = require('when');

module.exports = function(opts) {
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

		d.width = d.width || container.style('width').match(/\d+/g)[0];

		var color = opts.colors;
		var treemap = d3.layout.treemap()
			.size([d.width, d.height])
			.sticky(true)
			.sort(function(a, b) {
			  return a.value - b.value;
			})
			//.mode('squarify')
			.value(function(d) { return d.value; });

		_.each(d, function(v, k) {
			if(treemap[k] && typeof(treemap[k]) === 'function') {
				treemap[k](v);
			}
		});

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
					return (d.x + (seriesData.left || 0)) + "px";
				},
				'top': function(d) {
					return (d.y + (seriesData.top || 0)) + "px";
				},
				'width': function(d) {
					return Math.max(0, d.dx - 1) + "px";
				},
				'height': function(d) {
					return 0;
					//return Math.max(0, d.dy - 1) + "px";
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
				'border': '3px solid white',
				'overflow': 'hidden',
				'position': 'absolute',
				'text-indent': '2px'
			}, d.style))
			.transition()
			.delay(function(d, i) {
				return i * 10;
			})
			.duration(1000)
			.style({
				/*'left': function(d) {
					return (d.x + seriesData.left) + "px";
				},
				'top': function(d) {
					return (d.y + seriesData.top) + "px";
				},
				'width': function(d) {
					return Math.max(0, d.dx - 1) + "px";
				},*/
				'height': function(d) {
					return Math.max(0, d.dy - 1) + "px";
				}
			});
	});

	defer.resolve();

	return defer.promise;
};