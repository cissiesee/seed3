var _ = require('lodash');
var $ = require('jquery');
var dataTable = require('./DataTables/media/js/jquery.dataTables');
//var bootstrap = require('bootstrap');

module.exports = function(opts) {
	var containers = opts.containers;
	var dispatcher = opts.dispatcher;
	var colors = opts.colors.range();

	//bootstrap($);

	var data = [
		{id: 1, name: 'cissie', sex: 'female', age: '30'},
		{id: 2, name: 'jack', sex: 'male', age: '35'}
	];

	var columns = [{field: 'id', title:'id'},{field: 'name', title: 'name'}];
	var attributeId = 'id';

	containers.each(function(seriesOpts) {
		var tableContainer = d3.select(this);
		console.log(dataTable);

		var valueRange = d3.extent(_.pluck(seriesOpts.data, seriesOpts.valueKey));

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
					return 'tr' + attributeId ? (d[attributeId] || 'attributeId must be set') : i;
				}
			});

		tbodyTrs.selectAll('td')
			.data(function(d) {
				return _.map(seriesOpts.columns, function(col) {
					return {
						key: col.field,
						value: d[col.field] || undefined
					}
				});
			})
			.enter()
			.append('td')
			.text(function(d) {
				return d.value || '-';
			})
			.style({
				'background': function(d) {
					if(d.key === seriesOpts.valueKey) {
						return d.value===undefined ? 'none' : colorScale(d.value);
					}
				}
			});

		$(table.node()).dataTable({
			"info": false,
			"searching": false,
			"paging": false,
			"scrollY": (seriesOpts.height || 300) + 'px',
			"deferRender": true
		});
	});
}