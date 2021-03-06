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

		var color = opts.colors;

		container
			.style("width", d.width ? d.width + 'px' : '100%')
			.style("height", d.height + 'px');

		d.width = d.width || container.style('width').match(/\d+/g)[0];

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

		var nodes = container.datum(d.data).selectAll(".node")
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
					var name;
					if(seriesData.config) {
						name = d[seriesData.config.name];
					} else {
						name = d.name;
					}
					d.color = _.indexOf(color.domain(), name[0]) !==-1 ? color(name[0]) : color(name);
					return d.color;
				}
				return 'none';
			})
			.text(function(d) {
				var name;
				if(seriesData.config) {
					name = d[seriesData.config.name];
				} else {
					name = d.name;
				}
				return d.children ? null : name;
			})
			.style(_.extend({
				'border': '3px solid white',
				'overflow': 'hidden',
				'position': 'absolute',
				'text-indent': '2px'
			}, d.style));

		if(d.animation!==false) {
			nodes = nodes.transition().duration(typeof(d.animation) === 'number' ? d.animation : 1000);
		}

		nodes.style({
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

		if(seriesData.config && seriesData.config.sub) {
			nodes.append('p')
				.text(function(d) {
					return d[seriesData.config.sub];
				})
				.style({
					padding: 0,
					margin: 0
				});
		}
	});

	defer.resolve();

	return defer.promise;
};