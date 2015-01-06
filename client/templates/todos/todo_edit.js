Template.todoEdit.events({
	
	'submit form': function(e) {
		e.preventDefault();

		var currentTodoId = this._id;

		var todoProperties = {
			title: 		$(e.target).find('[name=title]').val(),
			duedate: 	new Date( $(e.target).find('[name=duedate]').val() )
		}

		Todos.update(currentTodoId, {$set: todoProperties}, function(error) {
			if (error) {
				// display error to user
				alert(error.reason);
			} else {
				Router.go('todoPage', {_id: currentTodoId});
			}
		});
	},

	'click .delete': function(e) {
		e.preventDefault();

		if (confirm("Delete this todo?")) {
			var currentTodoId = this._id;
			Todos.remove(currentTodoId);
			Router.go('todoList');
		}
	}

});