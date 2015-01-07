Meteor.publish('todos', function(){
	return Todos.find();
});

Meteor.publish('comments', function(){
	return Comments.find();
});