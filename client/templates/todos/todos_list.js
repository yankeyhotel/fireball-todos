Template.todosList.helpers({
	todos: function() {
		return Todos.find({userId: Meteor.userId()}, {sort: {duedate: 1}});
	}
});