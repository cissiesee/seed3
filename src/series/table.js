var _ = require('lodash');
var $ = require('jquery');
var dataTable = require('./DataTables/media/js/jquery.dataTables');
//var dataTableFixedColumns = require('./DataTables/media/js/dataTables.fixedColumns');
//var bootstrap = require('bootstrap');

module.exports = function(opts) {
	var containers = opts.containers;
	var dispatcher = opts.dispatcher;
	var colors = opts.colors.range();

	var columns = [{field: 'id', title:'id'},{field: 'name', title: 'name'}];
	var attributeId = 'id';

	containers.each(function(seriesOpts) {
		var tableContainer = d3.select(this);

		var valueRange = seriesOpts.valueRange || d3.extent(_.pluck(seriesOpts.data, seriesOpts.valueKey));

		var colorScale = d3.scale.linear()
			.domain(valueRange)
			.range(colors);

		var table = tableContainer.append('table')
			.attr({
				'data-toggle': 'table',
				'class': 'table'
			})
			.style({
				width: seriesOpts.width || '100%'
			});
		
		var thead = table.append('thead');

		var tbody = table.append('tbody');

		var theadTr = thead.append('tr');

		theadTr.selectAll('th')
			.data(seriesOpts.columns)
			.enter()
			.append('th')
			.attr({
				'name': function(d) {
					return d.field;
				}
			})
			.text(function(d) {
				return d.title;
			});

		var tbodyTrs = tbody.selectAll('tr')
			.data(seriesOpts.data)
			.enter()
			.append('tr')
			.attr({
				id: function(d, i) {
					return 'tr' + i;
					//return 'tr' + attributeId ? (d[attributeId] || 'tr' + i ) : i;
				}
			});

		tbodyTrs.selectAll('td')
			.data(function(d) {
				return _.map(seriesOpts.columns, function(col) {
					return _.extend({}, col, {
						key: col.field,
						value: d[col.field],
						data: d
					});
				});
			})
			.enter()
			.append('td')
			.html(function(d) {
				if(d.formatter) {
					return d.formatter.call(this, d.value, seriesOpts.data);
				} else {
					return d.value === undefined ? '-' : d.value;
				}
			})
			.style({
				'background': function(d) {
					return;
					if(seriesOpts.valueKey && d.key === seriesOpts.valueKey) {
						return d.value===undefined ? 'none' : colorScale(d.value);
					} else {
						if(!seriesOpts.valueKey && d.key !== seriesOpts.attributeId && typeof(d.value) == 'number') {
							return d.value===undefined ? 'none' : colorScale(d.value);
						}
					}
				}
			})
			.each(function(d) {
				if(d.postProcess) {
					d.postProcess.call(this, d, seriesOpts.data);
				}
			});

		var dataTableOpts = seriesOpts.table || {};

		if(seriesOpts.height) {
			dataTableOpts.scrollY = seriesOpts.height + 'px';
		}

		var dataTable = $(table.node()).dataTable(_.extend({
			"info": false,
			"searching": false,
			"paging": false,
			"scrollX": "100%",
			"order": [[0,false]],
			//"responsive": true,
			"scrollY": '300px',
			"deferRender": true
		}, dataTableOpts));

		//new $.fn.dataTable.FixedColumns(dataTable);
	});
}