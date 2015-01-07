Template.todoSubmit.created = function() {
	Session.set('todoSubmitErrors', {});
}


Template.todoSubmit.helpers({
	errorMessage: function(field) {
		return Session.get('todoSubmitErrors')[field];
	},

	errorClass: function(field) {
		return !!Session.get('todoSubmitErrors')[field] ? 'has-error' : '';
	}
});


Template.todoSubmit.events({
	'submit form': function(e){
		e.preventDefault();

		var todo = {
			title: 		$(e.target).find('[name=title]').val(),
			duedate: 	new Date( $(e.target).find('[name=duedate]').val() )
		}

		var errors = validateTodos(todo);
		if (errors.title || errors.duedate)
			return Session.set('todoSubmitErrors', errors);

		Meteor.call('todoInsert', todo, function(error, result){
			// display error to the user
			if (error)
				Errors.throw(error.reason);
			
			Router.go('todoPage', {_id: result._id});
		});
		
	}
});


Template.todoSubmit.rendered = function() {

	// http://eonasdan.github.io/bootstrap-datetimepicker/#options
	$('#duedate').datetimepicker({
		pickDate: 		true,					// en/disables the date picker
		pickTime: 		true,					// en/disables the time picker
		useMinutes: 	true,					// en/disables the minutes picker
		useSeconds: 	false,					// en/disables the seconds picker
		useCurrent: 	false,					// when true, picker will set the value to the current date/time
		minuteStepping: 30, 					// set the minute stepping
    	minDate: 		moment().format('L'),	// set a minimum date
    	showToday: 		true,					// shows the today indicator
    	sideBySide: 	true, 					// show the date and time picker side by side
	});

}