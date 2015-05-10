define(function(require) {
	return function(data,container) {
		var titles = {};
		var flags = data.flags;
		var axisInfo = data.axisInfo;

		_.each(axisInfo, function(obj, key) {
			if(flags.axisTitle[key]) {
				titles[key] = container.append('text')
					.text(obj.title);
			}
		});

		return titles;
	}
})