define(function(require) {
	var core = require('./core');
	
	return function(opts) {
		var tooltip = core(opts);

		var container = d3.select(opts.container);
		var elements = container.selectAll(opts.selector);

		elements
			.on('mouseenter', function(d) {
				tooltip.updateData(d).show();
			})
			.on('mousemove', function(d) {
				var position = d3.mouse(container.node());
				position[0] = position[0] * 1 + opts.offset;

				tooltip.updatePosition(position);
			})
			.on('mouseleave', function() {
				tooltip.hide();
			});

		return tooltip;
	}
})