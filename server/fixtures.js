if (Todos.find().count() === 0) {
	var now = new Date().getTime();

	Todos.insert({
		title: 'Create HTML',
		duedate: new Date(now + 7 * 3600 * 1000)
	});

	Todos.insert({
		title: 'Create CSS',
		duedate: new Date(now + 8 * 3600 * 1000)
	});

	Todos.insert({
		title: 'Create Javascript',
		duedate: new Date(now + 9 * 3600 * 1000)
	});

}