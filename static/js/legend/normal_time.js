define(function(require) {
	var legend = require('./normal');

	return function(chartObj, opts) {
		var legendObj = legend(chartObj, opts);

		var _data = chartObj.data;
		var layout = _data.layout;
		var offset = layout.height / 2;
		var config = _data.originalData.config;
		var symbolSize = 7;

		var updateArrow = function() {
			var selectedLength = timeLegend.selectAll('g.selected').size();
			switch(selectedLength) {
				case 0:
				case 1:
					chartObj.canvas.selectAll('g.connection-arrow').style('display', 'none');
					break;
				case 2:
					chartObj.canvas.selectAll('g.connection-arrow').style('display', 'block');
			}
		}

		var timeLegend = legendObj.container.append('g')
			.attr({
				class: 'time-legend',
				transform: 'translate(' + opts.padding.left + ',' + offset + ')'
			});

		timeLegend.append('text')
			.text('Time')
			.style({
				'font-size': '20px'
			});

		var timeLegendItem = timeLegend.selectAll('g')
			.data(config.legend.time)
			.enter()
			.append('g')
			.attr({
				class: 'legend-item selected',
				period: function(d) {
					return d.period;
				},
				transform: function(d, i) {
					return 'translate(0,' + (30 + i * 30) + ')';
				}
			})
			.on('click', function(d) {
				var d3this = d3.select(this);
				if(d3this.classed(opts.toggleClass)) {
					d3this.classed(opts.toggleClass, false);
					var currentDots = chartObj.canvas.selectAll('g.dot').filter(function(data) {
						return data.period == d.period;
					});
					currentDots.style('display', 'none');
					updateArrow();
					//chartObj.hideSeries(d.name);
				} else {
					d3this.classed(opts.toggleClass, true);
					var currentDots = chartObj.canvas.selectAll('g.dot').filter(function(data) {
						return data.period == d.period;
					});
					currentDots.style('display', 'block');
					updateArrow();
					//chartObj.showSeries(d.name);
				}
			})
			.style({
				cursor: 'pointer'
			});

		timeLegendItem.append('path')
			.attr({
				d: d3.svg.symbol().type('circle').size(symbolSize * symbolSize)
			})
			.style({
				'stroke-dasharray': function(d) {
					return d.period == 1 ? '2,2' : 'none';
				},
				fill: '#fff',
				stroke: '#333',
				'fill-opacity': 0.6
			});

		timeLegendItem.append('text')
			.text(function(d) {
				return d.label;
			})
			.attr({
				x: symbolSize + 5,
				dy: '0.33em'
			})
			.style({
				cursor: 'inherit'
			});

		return legendObj;
	}
})