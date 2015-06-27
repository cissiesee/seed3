//var dispatch = require('../dispatch');
var model = require('../model/chart_model');

// title: {
// 	text: 'dfe',
// 	subtext: 'dfewe',
// 	style: {

// 	},
//	textStyle: {

//	}
// }

function update(data) {
	var dom = this;
	var titleContainer;
	var titleObj = data.get('title');
	if(data.get('domType') === 'div') {
		titleContainer = dom.append('div')
			.attr({
				'class': 'chart-title'
			})
			.style(titleObj.style);
		titleContainer.append('h3').text(titleObj.text).style(titleObj.textStyle);
		titleContainer.append('h5').text(titleObj.subtext).style(titleObj.subtextStyle);
	} else {
		titleContainer = dom.append('g')
			.attr({
				'class': 'chart-title',
				'transform': 'translate(0,0)'
			})
			.style(titleObj.style);
		titleContainer.append('text').attr({x:0,y:0}).text(titleObj.text).style(titleObj.textStyle);
		titleContainer.append('text').text(titleObj.subtext)
			.attr({y: titleObj.textStyle.fontSize})
			.style(titleObj.subtextStyle);
	}
}

module.exports = function() {
	var title = function(dom) { //exe once
		model.on('change:domType', function(data) {
			update.call(dom, data);
		});

		model.on('change:title', function(data) {
			update.call(dom, data);
		});
	};

	return title;
}