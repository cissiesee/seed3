define(function(require) {
	require('d3');
	var when = require('when');
	//var scatter = require('./scatter');
	var lines = require('./line');

	return function(opts) {
		//var defer = when.defer();
		var scales = opts.scales;
		var datas = opts.containers.data();
		var dispatcher = opts.dispatcher;

		function getPath(opts) {
			var path = d3.svg.area()
				.x(function(d) {
					return scales.get('x')(d.x);
				})
				.y0(function(d) {
					return scales.get('y')(d.y0);
				})
				.y1(function(d) {
					return scales.get('y')(d.y1);
				});

			_.each(opts, function(option, key) {
				if(typeof(path[key]) === 'function') {
					path[key](option);
				}
			});

			return path;
		}

		function handleStack() {
			var stackDatas = datas;//_.cloneDeep(datas);
			var valueAxis = _.find(scales.data, {type: 'value'}).key;
			var groups = _.groupBy(stackDatas, 'stack');
			_.each(groups, function(group, name) {
				group = _.filter(group, function(item) {return item.show!==false});
				var groupDatas = _.pluck(group, 'data');
				_.each(groupDatas, function(data, i) {
					if(i) {
						_.each(data, function(d, j) {
							var prevData = groupDatas[i - 1][j].node[valueAxis];
							d.node[valueAxis + '0'] = prevData;
							d.node[valueAxis + '1'] = d.node[valueAxis] + prevData;
						});
					} else {
						_.each(data, function(d, j) {
							d.node[valueAxis + '0'] = 0;
							d.node[valueAxis + '1'] = d.node[valueAxis];
						});
					}
				});
			});

			//console.log(d3.helper.getDomain(datas, valueAxis));

			dispatcher.change(valueAxis, valueAxis + '1');

			return stackDatas;
		}

		function updateAttr() {
			if(!this.size()) {
				return;
			}
			this.transition()
				.duration(500)
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
				var style = _.extend({'fill': d.color, 'fill-opacity': 0.6}, d.style);
				d3.select(this)
					.style(style)
					.style({
						'stroke': 'none'
					});
			});
		}

		function updateGraph() {
			opts.containers.each(function(d) {
				var currentPath = d3.select(this).select('path.area');

				if(!currentPath.size()) {
					currentPath = d3.select(this).append('path')
						.attr({
							'class': 'area',
							d: function(d) {
								var path = getPath(d.typeOptions);
								return path(_.map(d.data, function(item) {
										var startPoint = _.cloneDeep(item.node);
										startPoint.y0 = 0;
										startPoint.y1 = 0;
										return startPoint;
									})
								);
							}
						});
				}

				if(d.show === false) {
					currentPath
						//.data(currentData)
						.transition()
						.attr({
							d: function(d) {
								var path = getPath(d.typeOptions);
								return path(_.map(d.data, function(item) {
										var startPoint = _.cloneDeep(item.node);
										startPoint.y1 = startPoint.y0;
										return startPoint;
									})
								);
							}
						})
						.style({
							opacity: 0
						});
				} else {
					currentPath
						.style({
							opacity: 1
						})
						.call(updateAttr)
						.call(updateStyle);
				}
			});
		}

		handleStack();
		updateGraph();

		//defer.resolve();

		lines(opts);

		//return defer.promise;
		return {
			update: function(data) {
				handleStack();
				updateGraph();
			},
			dispatcher: dispatcher
		}
	}
})