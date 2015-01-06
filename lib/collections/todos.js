Todos = new Mongo.Collection('todos');

Todos.allow({
	update: function(userId, todo) { return ownsDocument(userId, todo); },
	remove: function(userId, todo) { return ownsDocument(userId, todo); }
});

Todos.deny({
	update: function(userId, todo, fieldNames) {
		// may only edit the following fields
		return ( _.without(fieldNames, 'title', 'duedate').length > 0 );
	}
});

Meteor.methods({
	todoInsert: function(todoAttributes){
		
		check(Meteor.userId(), String);
		check(todoAttributes, {
			title: String,
			duedate: Date 	// might want to enforce a stricter pattern at some point
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