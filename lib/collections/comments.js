Comments = new Mongo.Collection('comments');

Meteor.methods({
	commentInsert: function(commentAttributes) {
		check(this.userId, String);
		check(commentAttributes, {
			todoId: String,
			body: String
		});

		var user = Meteor.user();

		var todo = Todos.findOne(commentAttributes.todoId);
		if (!todo)
			throw new Meteor.Error('invalid-comment', 'You must comment on a todo');

		comment = _.extend(commentAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});

		return Comments.insert(comment);

	}
})