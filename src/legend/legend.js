//var utils = require('../utils');
var _ = require('lodash');
function processTheme(opts) {
	if(opts.theme) {
		if(opts.theme['global']) {
			_.extend(opts.style, opts.theme['global']);
		}
		if(opts.theme['item']) {
			_.each(opts.data, function(d, i) {
				_.extend(opts.style, opts.theme['item']);
			});
		}
	}
}

module.exports = function(opts) {
	var dispatcher = d3.dispatch('highlight','hide','show');
	/*var _data = opts.data;
	var layout = _data.layout;
	var scaleLayout = _data.scaleLayout;
	var circleR = 3.5, rectR = 4, lineW = 16;*/
	//var container = d3.select(selector + ' svg');

	processTheme(opts);

	var layout = opts.layout;
	var margin = layout.margin;
	var padding = layout.padding;
	var textStyle = opts.style.text;

	opts.container = typeof(opts.container) == 'string' ? d3.select(opts.container) : opts.container;

	//container
	var legend = opts.container.append(opts.containerTag)
		.attr({
			class: 'legend-container'
		});

	if(opts.containerTag == 'g') {
		legend.attr({
			transform: d3.helper.setTransform({
				translate: margin.left + ',' + margin.top
			})
		});

		var bg = legend.append('rect')
			.attr({
				width: layout.width,
				height: layout.height
			})
			.style(opts.style.container);
	} else {
		legend.style({
				width: layout.width + 'px',
				height: layout.height + 'px',
				position: 'absolute',
				top: margin.top + 'px',
				left: margin.left + 'px'
			})
			.style(opts.style.container)
	}

	//items
	var legendItems = legend.selectAll(opts.containerTag + '.legend-item')
		.data(opts.data)
		.enter()
		.append(opts.containerTag)
		.attr({
			class: 'legend-item ' + opts.toggleClass || 'selected',
			name: function(d) {
				return d.name;
			}
		})
		.on('click', function(d) {
			//todo dispatch data change event(hide or show)
			var d3this = d3.select(this);
			if(d3this.classed(opts.toggleClass)) {
				d3this.classed(opts.toggleClass, false);
				dispatcher.hide(d);
				//chartObj.hideSeries(d.name);
			} else {
				d3this.classed(opts.toggleClass, true);
				dispatcher.show(d);
				//chartObj.showSeries(d.name);
			}
		})
		.on(opts.highlightEventType || 'mouseover', function(d) {
			dispatcher.highlight(d);
			//todo dispatch data change event(highlight)
		})
		.style(function(d) {
			return d.style;
		});

	if(opts.containerTag == 'g') {
		legendItems.attr({
			transform: function(d, i) {
				var col = opts.column;
				var colIndex = i % col,
					rowIndex = Math.floor(i / col);

				var xvalue = colIndex * layout.width / col + padding.left;
				var yvalue = rowIndex * (textStyle['font-size'].match(/^\d+/)[0] || 12) * (textStyle['line-height'] || 1.5) + padding.top;

				return 	d3.helper.setTransform({
					translate: xvalue + ',' + yvalue
				});
			}
		});

		var legendIcon = legendItems.append('g')
			.datum(function(d) {
				if(d.type.match(/^line/)) {
					d.line = true;
				}
				return d;
			})
			.attr({
				class: 'legend-icon'
			});

		legendIcon.each(function(d) {
			var d3this = d3.select(this);
			if(d.line) {
				d3this.append('line')
					.attr({
						x1: 0,
						x2: opts.marker.width,
						y1: 0,
						y2: 0
					})
					.style(_.extend({
						'stroke-width': 2,
						'stroke': d.color,
					}, d.style));
			}
		});

		legendIcon.append('path')
			.attr({
				d: function(d, i) {
					var marker = d.marker;
					return d3.svg.symbol().type(marker.type || 'square').size(Math.pow(marker.r * 2,2))();
				},
				transform: function(d) {
					return 'translate(' + (d.line ? opts.marker.width / 2 : d.marker.r) + ', 0)';
				}
			})
			.each(function(d) {
				d3.select(this).style(
					_.extend({
						'fill-opacity': 1,
						'stroke': d.color,
						'fill': d.color
					}, d.style, d.marker.style)
				);
			});

		legendItems.append('text')
			.text(function(d) {
				return d.text || d.name;
			})
			.attr({
				x: function(d) {
					return d.line ? opts.marker.width + 6 : d.marker.r * 2 + 5;
				},
				dy: '0.3em',
				transform: function(d, i) {
					/*var col = opts.column;
					var colIndex = i % col,
						rowIndex = Math.floor(i / col);
					return 'translate(' + (colIndex * layout.width / col) + ',' + (rowIndex * (textStyle['font-size'].match(/^\d+/)[0] || 12) * (textStyle['line-height'] || 1.5)) + ')';*/
				}
			})
			.style(textStyle);
	} else {
		legendItems.append('span')
			.style({
				'display':'inline-block',
				'width': opts.marker.width + 'px',
				'height': opts.marker.height + 'px',
				'margin-right': '5px',
				'vertical-align': 'middle',
				'border-radius': '3px',
				'background': function(d) {
					return d.color || opts.colors(d.name || d);
				}
			});

		legendItems.append('span')
			.text(function(d) {
				return d.text || d.name || d;
			})
			.style(textStyle);
	}

	return {
		setStyle: function(style) { //css string or style object

		},
		dispatcher: dispatcher,
		items: legendItems //todo
	}
}