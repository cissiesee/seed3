define(function(require) {
	var bar = require('./bar_horizontal');
	return function(i, data) {
		var barGenerator = bar(i,data);

		var litigationTimeLine = function(container) {
			var barsObj = barGenerator(container),
				bars = barsObj.bars,
				barHeight = barsObj.barHeight;

			bars
				.datum(function(d) {
					d.judgement = d.name.match(/(^.*)_/)[1];
					return d;
				})
				.append('text')
				.text(function(d) {
					return d.plaintiffNname + ' vs. ' + d.defendantNname + '(' + d.caseFrom + '-' + d.caseTo + ')';
				})
				.attr({
					y: barHeight / 2,
					dy: '0.3em',
					dx: '0.3em'
				});

			bars.select('rect').style({
				'fill-opacity': 0.6
			});
		}

		return litigationTimeLine;
	}
})