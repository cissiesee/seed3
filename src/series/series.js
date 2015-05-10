/*var series = require('series');
when.all(seriesArr, function(err, result) {

})
series(d, i, opts).then(function() {}).catch(function())*/
var _ = require('lodash');
var when = require('when');
var seriesTypes = {
	area: require('./area'),
	treemap: require('./treemap'),
	line: require('./line'),
	table: require('./table')
};
//var _ = require('lodash');
//var queue = require('queue-async');
//var theme = require('./theme/dot');
module.exports = function(opts) {
	//var defer = when.defer();
	var dispatcher = d3.dispatch('change');

	function buildTasks() {
		var newContainers = opts.container.selectAll(opts.containerTag + '.series')
			.data(opts.series)
			.enter()
			.append(opts.containerTag);

		if(newContainers.size()) {
			newContainers.attr({
				'class': 'series'
			});
		}

		var containers = opts.container.selectAll(opts.containerTag + '.series')
			.data(opts.series)
			.attr({
				'class': function(d) {
					return 'series enabled ' + (d.show === false ? 'hide' : 'show');
				},
				'name': function(d) {
					return d.name;
				},
				'type': function(d) {
					return d.type;
				}
			});

		var oldContainers = opts.container.selectAll(opts.containerTag + '.series')
			.data(opts.series)
			.exit();

		if(oldContainers.size()) {
			oldContainers
				.classed('enabled', false)
				.datum(undefined);
		}

		var types = _.unique(_.pluck(opts.series, 'type'));

		var tasks = _.map(types, function(type) {
			var taskDefer = when.defer();
			var typeOpts = {
				//data: series,
				containers: opts.container.selectAll('[type="' + type + '"]'),
				containerTag: opts.containerTag,
				colors: opts.colors,
				scales: opts.scales,
				dispatcher: dispatcher
			};

			return {
				generator: seriesTypes[type],
				opts: typeOpts
				///graph: result
			};
		});

		return tasks;
	}

	function exeTasks() {
		var taskDefer = when.defer();
		when.all(_.map(buildTasks(), function(t) {
				return t.generator(t.opts);
			}), function(results) {
				taskDefer.resolve(results);
				//opts.onComplete(results);
				//console.log(results);
			}
		);
		return taskDefer.promise;
	}

	exeTasks();

	return {
		update: function(items) {
			if(items) {
				opts.series = items;
			}
			return exeTasks();
		},
		showSeries: function(item) {
			var currentItem = _.find(opts.series, {name: item.name});
			currentItem.show = true;
			return this.update();
		},
		hideSeries: function(item) {
			var currentItem = _.find(opts.series, {name: item.name});
			currentItem.show = false;
			return this.update();
		},
		dispatcher : dispatcher
	}
	//return defer.promise;
};
