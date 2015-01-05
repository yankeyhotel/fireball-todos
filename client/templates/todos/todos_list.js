var now = new Date().getTime();

var todosData = [
	{
		title: 'Create HTML',
		duedate: new Date(now + 7 * 3600 * 1000)
	},
	{
		title: 'Create CSS',
		duedate: new Date(now + 8 * 3600 * 1000)
	},
	{
		title: 'Create Javascript',
		duedate: new Date(now + 9 * 3600 * 1000)
	}
];

Template.todosList.helpers({
	todos: todosData
});