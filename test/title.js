var chartIns = new Seed3('#example');

function changeSize() {
	document.getElementById('example').setAttribute("style", "width:200px;");
	chartIns.resize();
	chartIns.setOption({
		//domType: 'div',
		title: {
			text: 'aa text',
			subtext: 'subtext'
		}
	});
}

chartIns.setOption({
	//domType: 'div',
	title: {
		text: 'text',
		subtext: 'subtext'
	}
});