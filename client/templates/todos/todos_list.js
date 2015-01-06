Template.todosList.helpers({
	todos: Todos.find({}, {sort: {duedate: 1}})
});