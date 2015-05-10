module.exports = function(d) {
	d.canvas.on('mousemove', function() {
		var position = d3.mouse(d.canvas);
		var key = _data.x.invertExtend(position[1]);
		var datas = _.where(_data.items, {y: key});
		var tipContent = juicer(_template, datas);
		tooltipContainer.html(tipContent);

		if(_animation) {
			tooltipContainer
				.transition()
				.style({
					top: _data.layout.height / 2 + 'px',
					left: position[0] + 'px'
				});
		} else {
			tooltipContainer
				.style({
					top: _data.layout.height / 2 + 'px',
					left: position[0] + 'px'
				});
		}
	});
}