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
			submitted: new Date(),
		});

		// update the Todo with the correct number of comments
		Todos.update(comment.todoId, { $inc: {commentCount: 1} });

		// now create a new notification, informing the user that there's been a comment
		createCommentNotification(comment);

		return Comments.insert(comment);

	}
})