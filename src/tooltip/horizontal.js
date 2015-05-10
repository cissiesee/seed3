var core = require('./core');
var utils = require('../utils');

module.exports = function(opts) {
	/*opts.tpl = opts.tpl || '<div style="border-color: #999">\
			{@each items as item, i}\
				<div class="tooltip-header">\
					<i style="background:${item.color}"></i>${item.name}<span>${item.x}</span>: ${item.y}\
				</div>\
			{@/each}\
		</div>';*/
	var tooltip = core(opts);

	//var d = chartObj.data;
	var scales = opts.scales;
	var categoryAxisName = 'x', valueAxisName = 'y';
	var categoryAxis = scales.get('x'), valueAxis = scales.get('y');
	//var markers = chartObj.getMarkers();
	var container = d3.select(opts.container);
	var root = opts.root;
	var plot = opts.plot;
	var elements = container.selectAll(opts.selector);

	var currentKey;
	var tipCache = {};

	var tipline = plot.append('line')
		.attr({
			x1: d3.min(categoryAxis.rangeExtent()),
			y1: d3.min(valueAxis.range()),
			x2: d3.min(categoryAxis.rangeExtent()),
			y2: d3.max(valueAxis.range())
		})
		.style({
			'stroke-dasharray': '5,5',
			'display':'none'
		});

	plot.on('mouseenter', function() {
			tooltip.show();
			tipline.style('display','block');
		})
		.on('mouseleave', function() {
			currentKey = '';
			tooltip.hide();
			tipline.style('display','none');
			elements.classed('selected', false);
		});
	
	plot.on('mousemove', function() {
		var position = d3.mouse(root.node());
		var currentX = position[0], currentYs = [];
		var step = categoryAxis.rangeBand() || categoryAxis.range()[1] - categoryAxis.range()[0];
		var xIndex = (_.sortedIndex(categoryAxis.range(), currentX - step / 2));
		var key = categoryAxis.domain()[xIndex];
		var datas = [];
		var currentElements;
		if(!key) {
			tooltip.hide();
			elements.classed('selected', false);
			tipline.style('display','none');
			return;
		}

		if(key == currentKey) {
			return;
		}
		currentKey = key;
		elements.classed('selected', false);
		tipline
			//.transition()
			//.ease('linear')
			//.duration(200)
			.attr({
				x1: categoryAxis(currentKey),
				x2: categoryAxis(currentKey)
			})
			.style({
				'display': 'block'
			});

		if(tipCache[currentKey]) {
			currentElements = tipCache[currentKey];
		} else {
			currentElements = elements.filter(function(d,i) {
				return d.node.x == currentKey;
			});
			tipCache[currentKey] = currentElements;
		}

		currentElements = currentElements.filter(function() {
			var d3this = d3.select(this);
			//console.log(d3this.style('opacity'));
			return !d3this.classed('hide');
		});

		currentElements.classed('selected', true);
		currentElements.each(function(d) {
			var d3this = d3.select(this);
			var y = d3.helper.getTransform(d3this.attr('transform'))[1];
			currentYs.push(y);
		});

		//tooltip.update([categoryAxis(currentKey) + opts.offset, d3.mean(currentYs) - tooltip.height() / 2], {items: currentElements.data()}).show();
		tooltip.update([categoryAxis(currentKey) + opts.offset, position[1]], {items: currentElements.data()}).show();
	});

	/*return {
		tooltip: tooltip,
		cache: tipCache
	}*/
	return tooltip;
}