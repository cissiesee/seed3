define(function(require) {
	require('d3');
	var when = require('when');
	var scatter = require('./scatter');

	return function(opts) {
		//var defer = when.defer();
		var scales = opts.scales;
		var datas = opts.containers.data();

		function getPath(opts) {
			var path = d3.svg.line()
				.x(function(d) {
					return scales.get('x')(d.x);
				})
				.y(function(d) {
					return scales.get('y')(d.y1 === undefined ? d.y : d.y1);
				});

			_.each(opts, function(option, key) {
				if(typeof(path[key]) === 'function') {
					path[key](option);
				}
			});

			return path;
		}

		function updateAttr() {
			if(!this.size()) {
				return;
			}
			this.transition()
				//.duration(500)
				/*.attrTween('d', function(d) {
					var nodes = _.map(d.data, function(item) {
						return item.node;
					});
					var path = getPath(d.typeOptions);
					var nscale = d3.scale.quantile()
						.domain([0,1])
						.range(nodes);

					var currentNodes = [];

					function interpolate(t) {
						var keyNode = nscale(t);
						currentNodes.push(keyNode);
						return path(currentNodes);
					}

					return interpolate;
				});*/
				.attr({
					d: function(d) {
						var path = getPath(d.typeOptions);
						return path(_.map(d.data, function(item) {
								return item.node;
							})
						);
					}
				});
		}

		function updateStyle() {
			if(!this.size()) {
				return;
			}
			this.each(function(d) {
				var style = _.extend({'stroke': d.color, 'fill': 'none'}, d.style);
				d3.select(this)
					.style(style);
			});
		}

		function updateGraph() {
			opts.containers.each(function(d) {
				//console.log(d);
				//var currentData = d ? [d] : [];

				var currentPath = d3.select(this).select('path.line');

				//init status
				if(!currentPath.size()) {
					currentPath = d3.select(this).append('path')
						.attr({
							'class': 'line',
							d: function(d) {
								var path = getPath(d.typeOptions);
								return path(_.map(d.data, function(item) {
										var startPoint = _.cloneDeep(item.node);
										startPoint.y = 0;
										startPoint.y1 = 0;
										return startPoint;
									})
								);
							}
						});
				}

				//hide
				if(d.show === false) {
					currentPath
						//.data(currentData)
						.transition()
						.duration(500)
						.attr({
							d: function(d) {
								var path = getPath(d.typeOptions);
								return path(_.map(d.data, function(item) {
										var startPoint = _.cloneDeep(item.node);
										if(startPoint.y1 === undefined) {
											startPoint.y = 0;
										} else {
											startPoint.y1 = startPoint.y0;		
										}
										return startPoint;
									})
								);
							}
						})
						.style({
							opacity: 0
						});
				} else { //show
					currentPath
						.style({
							opacity: 1
						})
						.call(updateAttr)
						.call(updateStyle);
				}
			});
		}

		updateGraph();
		scatter(opts);

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