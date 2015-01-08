Meteor.publish('todos', function(){
	return Todos.find();
});

Meteor.publish('comments', function(todoId){
	check(todoId, String);
	return Comments.find({todoId: todoId});
});

Meteor.publish('notifications', function() {
	return Notification.find();
})