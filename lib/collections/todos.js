Todos = new Mongo.Collection('todos');

Todos.allow({
	update: function(userId, todo) { return ownsDocument(userId, todo); },
	remove: function(userId, todo) { return ownsDocument(userId, todo); }
});

Todos.deny({
	update: function(userId, todo, fieldNames, modifier) {
		// may only edit the following fields
		return ( _.without(fieldNames, 'title', 'duedate', 'description', 'userId', 'user', 'groupId', 'group', 'done').length > 0 );
	}
});

Meteor.methods({
	todoInsert: function(todoAttributes){

		check(Meteor.userId(), String);
		check(todoAttributes, {
			title: String,
			duedate: Date,
			description: String,
			userId: String,
			user: String,
			groupId: String,
			group: String
		});

		var errors = validateTodos(todoAttributes);
		if (errors.title || errors.duedate)
			throw new Meteor.Error('invalid-post', "You must set a title and due date for your ToDo");

		var user = Meteor.user();

		var todo = _.extend(todoAttributes, {
			authorId: user._id,
			author: user.profile.name,
			submitted: new Date(),
			commentCount: 0,
			checked: false
		});

		var todoId = Todos.insert(todo);

		// increment the todosCount i.e. http://stackoverflow.com/questions/19027893/updating-meteor-users
		Meteor.users.update({_id: todo.userId}, {$inc: {'profile.todosCount': 1}});

		return {
			_id: todoId
		};

	},

	todoSetChecked: function(todoId, setChecked) {
		var todo = Todos.findOne(todoId);
		var incAmount = (setChecked) ? -1 : 1;

		Todos.update(todoId, { $set: {checked: setChecked} });
		Meteor.users.update({_id: todo.userId}, {$inc: {'profile.todosCount': incAmount}});
	},
});

validateTodos = function (todo) {
	var errors = {};
	if (!todo.title)
		errors.title = "Please fill in a ToDo Title or no Fireball for you!";
	if (!todo.duedate)
		errors.duedate =  "Please fill in a Due Date or no Fireball for you!";
	return errors;
}