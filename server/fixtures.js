if (Todos.find().count() === 0) {
	var now = new Date().getTime();

	// create two users
	var mattId = Meteor.users.insert({
		profile: { name: 'Matt McClard' }
	});
	var matt = Meteor.users.findOne(mattId);

	var kelseyId = Meteor.users.insert({
		profile: { name: 'Kelsey Wiley' }
	});
	var kelsey = Meteor.users.findOne(kelseyId);


	var oneId = Todos.insert({
		title: 'Create HTML',
		userId: matt._id,
		author: matt.profile.name,
		submitted: new Date(now - 5 * 3600 * 1000),
		duedate: new Date(now + 8 * 3600 * 1000)
	});

	Comments.insert({
		todoId: oneId,
		userId: matt._id,
		author: matt.profile.name,
		submitted: new Date(now - 4 * 3600 * 1000),
		body: "I have a question."
	});

	Comments.insert({
		todoId: oneId,
		userId: kelsey._id,
		author: kelsey.profile.name,
		submitted: new Date(now - 3 * 3600 * 1000),
		body: "Here is your answer."
	});

	Comments.insert({
		todoId: oneId,
		userId: matt._id,
		author: matt.profile.name,
		submitted: new Date(now - 2 * 3600 * 1000),
		body: "Awesome thank you."
	});


	Todos.insert({
		title: 'Create CSS',
		userId: matt._id,
		author: matt.profile.name,
		submitted: new Date(now - 5 * 3600 * 1000),
		duedate: new Date(now + 9 * 3600 * 1000)
	});

	Todos.insert({
		title: 'Create CSS',
		userId: matt._id,
		author: matt.profile.name,
		submitted: new Date(now - 5 * 3600 * 1000),
		duedate: new Date(now + 10 * 3600 * 1000)
	});

}