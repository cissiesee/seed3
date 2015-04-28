define(function(require) {
	require('juicer');
	require('jquery');
	var Tooltip = function(opts) {
		var defaults = {
			data: {},
			tpl: '<p class="tooltip-header">{name}<span>{x}</span></p><p class="tooltip-sub">{yTitle}: {y}</p>',
			position: [0,0],
			animation: true
		};
		opts = _.extend(defaults, opts);
		this.opts = opts;
		/*this.id = opts.id;
		this.tpl = opts.tpl;
		this.data = opts.data;
		this.position = opts.position;
		this.transition = opts.transition;*/
		this.$container = $(opts.container);
		this.init(opts);
	}

	Tooltip.prototype = {
		constructor: Tooltip,
		init: function(opts) {
			this.$el = $('<div class="tooltip"></div>')
				.css({
					'position': 'absolute',
					'top': '0',
					'left': '0',
					'text-transform': 'capitalize',
					'background': 'rgba(255, 255, 255, 0.8)',
					'border': '1px solid #aaa',
					'border-radius': '5px',
					'box-shadow': '0 2px 6px rgba(0, 0, 0, 0.2)',
					'padding': '5px'
				});

			this.$el.attr('id', opts.id);
			this.$container.append(this.$el);
			this.$el.hide();
			//this.updatePosition([0,0]);
			return this;
		},
		setTpl: function(tpl) {
			this.opts.tpl = tpl;
			return this;
		},
		show: function() {
			this.$el.show();
			return this;
		},
		hide: function() {
			this.$el.hide();
			return this;
		},
		renderData: function(tpl) {
			var data = this.opts.data || {};
			var content = juicer(tpl || this.opts.tpl, data);
			this.$el.html(content);
			return this;
		},
		updateData: function(data) {
			var self = this;
			this.opts.data = data;
			this.$el.css({
				'border-color': data.color
			});
			if(typeof(this.opts.tpl) == 'function') {
				//self.updateData('Loading...');
				this.$el.html('Loading...');
				this.opts.tpl(data, function(tplStr) {
					//self.opts.tpl = tplStr;
					self.renderData(tplStr);
				});
			} else {
				self.renderData();
			}
			return this;
		},
		updatePosition: function(position) {
			position = position || this.opts.position;

			var style = {
				left: position[0] + 'px',
				top: position[1] + 'px'
			};

			if(this.opts.animation && this.opts.type !== 'point_mouse') {
				d3.select(this.$el[0])
					.transition()
					.style(style);
			} else {
				d3.select(this.$el[0])
					.style(style);
			}

			return this;
		},
		update: function(position, data) {
			var self = this;
			if(data) {
				self.updateData(data);
			}
			
			self.updatePosition(position);

			return this;
		},
		width: function() {
			return this.$el.width();
		},
		height: function() {
			return this.$el.height();
		}
	}

	return Tooltip;
})