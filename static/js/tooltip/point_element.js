define(function(require) {
	var core = require('./core');
	var utils = require('../utils');
	require('d3');

	return function(opts) {
		var tooltip = core(opts);

		/*if(opts.template) {
			tooltip.setTpl(opts.template);
		}*/

		/*chartObj.plot
			.on('mouseenter', function() {
				tooltip.show();
			})
			.on('mouseleave', function() {
				tooltip.hide();
			});*/

		var elements = d3.select(opts.container).selectAll(opts.selector);

		elements.on(opts.eventType, function(d) {
			var d3this = d3.select(this);
			var position;
			/*d3this.select('rect').style({
				'opacity': 0.6
			});*/
			if(opts.containerTag == 'g') {
				position = d3.helper.getTransform(d3this.attr('transform'));
			} else {
				position = [d3this.style('left').match(/^\d+/)[0] * 1, d3this.style('top').match(/^\d+/)[0] * 1];
			}

			switch(opts.orient) {
				case 'top':
					tooltip.setData(d);
					position[1] = position[1] - opts.offset * 1 - tooltip.height();
					break;
				case 'right':
					position[0] = position[0] + opts.offset * 1;
					break;
			}
			//d3this.classed('selected', true);
			//d3this.select('.hover').style('opacity', 1);
			tooltip.update(position, d).show();
		})
		.on('mouseleave', function(d) {
			tooltip.hide();
			var d3this = d3.select(this);
			d3this.select('rect').style({
				'opacity': 1
			});
			/*var d3this = d3.select(this);
			d3this.classed('selected', false);
			d3this.select('.hover').style('opacity', 1);*/
		});

		return tooltip;
	}
})