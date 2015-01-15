if (Todos.find().count() === 0) {
	var now = new Date().getTime();

	// create two users
	var mattId = Accounts.createUser({
		email: 'yankeyhotel@gmail.com',
		password: 'fattie77',
		profile: {
			name: 'Matt McClard',
			todosCount: 3,
		},
		username: 'yankeyhotel'
	});
	var matt = Meteor.users.findOne(mattId);

	var kelseyId = Accounts.createUser({
		email: 'kelsey@switch.is',
		password: 'Switch123',
		profile: {
			name: 'Kelsey Wiley',
			todosCount: 0,
		},
		username: 'wiley'
	});
	var kelsey = Meteor.users.findOne(kelseyId);


	// create admin roles
	Roles.addUsersToRoles([mattId, kelseyId], ['super-admin']);


	// create all other roles
	Roles.createRole("admin");
	Roles.createRole("designer");
	Roles.createRole("management");
	Roles.createRole("project-manager");
	Roles.createRole("web-developer");


	// create groups
	var groupOneId = Groups.insert({
		title: 'Jobs for Morning Time',
		userId: matt._id,
		author: matt.profile.name,
		description: "Modo typi qui nunc nobis videntur parum clari fiant sollemnes in. Vel eum iriure dolor in hendrerit in vulputate.",
		submitted: new Date(now - 5 * 3600 * 1000),
		todosCount: 3,
		commentCount: 0,
	});

	Groups.insert({
		title: 'Switch Todos',
		userId: kelsey._id,
		author: kelsey.profile.name,
		description: "Modo typi qui nunc nobis videntur parum clari fiant sollemnes in. Vel eum iriure dolor in hendrerit in vulputate.",
		submitted: new Date(now - 5 * 3600 * 1000),
		todosCount: 0,
		commentCount: 0,
	});


	// create some Todos
	var oneId = Todos.insert({
		title: 'Create HTML',
		authorId: matt._id,
		author: matt.profile.name,
		userId: matt._id,
		user: matt.profile.name,
		groupId: groupOneId,
		group: 'Jobs for Morning Time',
		submitted: new Date(now - 5 * 3600 * 1000),
		duedate: new Date(now + 8 * 3600 * 1000),
		description: "Est notare quam littera gothica quam nunc putamus parum claram. Per seacula quarta decima et quinta decima eodem modo? Nostrud exerci tation ullamcorper suscipit lobortis nisl ut. Est usus legentis in, iis qui facit eorum claritatem Investigationes demonstraverunt lectores legere me!",
		commentCount: 3,
		checked: false
	});

	Comments.insert({
		pageId: oneId,
		userId: matt._id,
		author: matt.profile.name,
		submitted: new Date(now - 4 * 3600 * 1000),
		body: "I have a question."
	});

	Comments.insert({
		pageId: oneId,
		userId: kelsey._id,
		author: kelsey.profile.name,
		submitted: new Date(now - 3 * 3600 * 1000),
		body: "Here is your answer."
	});

	Comments.insert({
		pageId: oneId,
		userId: matt._id,
		author: matt.profile.name,
		submitted: new Date(now - 2 * 3600 * 1000),
		body: "Awesome thank you."
	});


	Todos.insert({
		title: 'Create CSS',
		authorId: matt._id,
		author: matt.profile.name,
		userId: matt._id,
		user: matt.profile.name,
		groupId: groupOneId,
		group: 'Jobs for Morning Time',
		submitted: new Date(now - 5 * 3600 * 1000),
		duedate: new Date(now + 9 * 3600 * 1000),
		description: "Est notare quam littera gothica quam nunc putamus parum claram. Per seacula quarta decima et quinta decima eodem modo? Nostrud exerci tation ullamcorper suscipit lobortis nisl ut. Est usus legentis in, iis qui facit eorum claritatem Investigationes demonstraverunt lectores legere me!",
		commentCount: 0,
		checked: false
	});

	Todos.insert({
		title: 'Create CSS',
		authorId: matt._id,
		author: matt.profile.name,
		userId: matt._id,
		user: matt.profile.name,
		groupId: groupOneId,
		group: 'Jobs for Morning Time',
		submitted: new Date(now - 5 * 3600 * 1000),
		duedate: new Date(now + 10 * 3600 * 1000),
		description: "Est notare quam littera gothica quam nunc putamus parum claram. Per seacula quarta decima et quinta decima eodem modo? Nostrud exerci tation ullamcorper suscipit lobortis nisl ut. Est usus legentis in, iis qui facit eorum claritatem Investigationes demonstraverunt lectores legere me!",
		commentCount: 0,
		checked: false
	});



}










