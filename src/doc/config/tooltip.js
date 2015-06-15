{
	container: 'body',
	selector: '.marker',  //interact on which tooltip will display
	eventType: 'mouseover', 
	delay: 200,
	animation: true,
	type: 'point_element', //'x', 'y', 'mouse'
	//todo each
	orient: 'right',
	offset: 20,
	adaptive: true, //adapt tooltip's position
	style: {},
	formatter: function(d) {
		console.log(this);
	}	
}