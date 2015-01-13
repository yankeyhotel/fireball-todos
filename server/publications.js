Meteor.publish('todos', function(){
	return Todos.find();
});

Meteor.publish('comments', function(todoId){
	check(todoId, String);
	return Comments.find({ todoId: todoId });
});

Meteor.publish('notifications', function() {
	return Notifications.find();
});

Meteor.publish('allUsers', function() {
	return Meteor.users.find({});
});

Meteor.publish(null, function(){ 
	return Meteor.roles.find();
});

Meteor.publish('groups', function(){
	return Groups.find();
})