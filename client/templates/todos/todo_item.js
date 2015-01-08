Template.todoItem.helpers({
	ownTodo: function() {
		return this.userId === Meteor.userId();
	}
});