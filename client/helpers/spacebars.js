UI.registerHelper('displayFormat', function(date){
	// use .toISOString() because of reasons
	// https://github.com/moment/moment/issues/1407
	var string = date.toISOString();
	return moment(string).calendar();
});


UI.registerHelper('formFormat', function(date) {
	var string = date.toISOString();
	return moment(string).format("MM/DD/YYYY HH:mm A");
});