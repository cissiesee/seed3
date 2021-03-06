//var dispatch = require('../dispatch');
var chartModel = require('../model/chart_model');
var _ = require('lodash');
// title: {
// 	text: 'dfe',
// 	subtext: 'dfewe',
// 	style: {

// 	},
//	textStyle: {

//	}
// }

function redraw() {
	var dom = this;
	var data = dom.datum();
	var titleContainer;
	var titleObj = _.extend({
		textStyle: {
			'padding': 0,
			'margin': 0
		},
		subtextStyle: {
			'padding': 0,
			'margin': 0
		}
	}, data.title);

	dom.empty();
	if(data.domType === 'div') {
		titleContainer = dom.append('div')
			.attr({
				'class': 'chart-title'
			})
			.style(titleObj.style);

		titleContainer.append('h3')
			.text(titleObj.text)
			.style(titleObj.textStyle);
			
		titleContainer.append('h5')
			.text(titleObj.subtext)
			.style(titleObj.subtextStyle);
	} else {
		titleContainer = dom.append('g')
			.attr({
				'class': 'chart-title',
				'transform': 'translate(0,0)'
			})
			.style(titleObj.style);

		titleContainer.append('text')
			.text(titleObj.text)
			.attr({
				x:0,
				y:0,
				dy: '1em',
				'class': 'main-title'
			})
			.style(titleObj.textStyle);

		titleContainer.append('text')
			.text(titleObj.subtext)
			.attr({
				dy: '2.3em',
				'class': 'sub-title'
			})
			.style(titleObj.subtextStyle);
	}
}

function update() {
	var data = this.datum();
	var titleObj = data.title;
	this.select('.main-title')
		.text(titleObj.text);

	this.select('.sub-title')
		.text(titleObj.subtext);
}

module.exports = function() {
	var title = function(dom) { //exe once
		redraw.call(dom);

		chartModel.on('change:title', function(data) {
			console.log('title');
			dom.datum({
				domType: data.get('domType'),
				title: data.get('title')	
			});
			update.call(dom);
		});
	};

	return title;
}