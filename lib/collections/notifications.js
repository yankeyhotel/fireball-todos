Notifications = new Mongo.Collection('notifications');

Notifications.allow({
	update: function(userId, doc, fieldNames) {
		return ownsDocument(userId, doc) && fieldNames.length === 1 && fieldNames[0] === 'read';
	}
});

createCommentNotification = function(comment) {
	// var todo = Todos.findOne(comment.todoId);
	// if (comment.userId !== todo.userId) {
	// 	Notifications.insert({
	// 		userId: todo.userId,
	// 		todoId: todo._id,
	// 		commentId: comment._id,
	// 		commenterName: comment.author,
	// 		read: false
	// 	})
	// }
}