var dispatch = require('d3').dispatch;

module.exports = dispatch(
	'set_option',
	'set_theme',
	'destroy',
	'reset',
	'resize',
	'add_series',
	'remove_series',
	'show_series',
	'hide_series',
	'click_series',
	'hover_series',
	'drag_point',
	'add_point',
	'remove_point',
	'click_point',
	'hover_point',
	'drag_title',
	'exports'
);