Todos = new Mongo.Collection('todos');

Meteor.methods({
	todoInsert: function(todoAttributes){
	
		check(Meteor.userId(), String);
		check(todoAttributes, {
			title: String,
			duedate: String
		});

		var user = Meteor.user();

		var todo = _.extend(todoAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});

		var todoId = Todos.insert(todo);

		return { 
			_id: todoId 
		};
	
	}
})