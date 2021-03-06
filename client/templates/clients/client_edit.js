Template.clientEdit.created = function() {
	Session.set('clientSubmitErrors', {});
}


Template.clientEdit.helpers({
	errorMessage: function(field) {
		return Session.get('clientSubmitErrors')[field];
	},

	errorClass: function(field) {
		return !!Session.get('clientSubmitErrors')[field] ? 'has-error' : '';
	},

	projectManagers: function() {
		return Roles.getUsersInRole('project-manager');
	},

	isCurrentUser: function(userId, client) {
		return userId === client.userId;
	},
});


Template.clientEdit.events({
	'submit form': function(e){
		e.preventDefault();

		var client = {
			title: 	$(e.target).find('[name=title]').val(),
			pmId: 	$(e.target).find('#user-select').val(),
			pm: 	$(e.target).find('#user-select option:selected').text(),
		}

		var errors = validateClient(client);
		if (errors.title || errors.duedate)
			return Session.set('clientSubmitErrors', errors);

		Meteor.call('clientInsert', client, function(error, result){
			// display error to the user
			if (error)
				Errors.throw(error.reason);

			Router.go('clientsList');
		});

	}
});


Template.clientEdit.rendered = function() {

	$('#user-select').multiselect({
		buttonClass: "btn btn-sm btn-off-white",
		numberDisplayed: 1
	});

}