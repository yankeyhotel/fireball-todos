Todos = new Mongo.Collection('todos');

Todos.allow({
	insert: function(userId, doc) {
		// only allow posting if you are logged in
		return !! userId;
	}
})