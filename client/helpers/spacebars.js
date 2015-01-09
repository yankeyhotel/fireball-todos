UI.registerHelper('displayFormat', function(date){
	// use .toISOString() because of reasons
	// https://github.com/moment/moment/issues/1407
	var string = date.toISOString();
	return moment(string).calendar();
});
