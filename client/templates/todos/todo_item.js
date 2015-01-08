Template.todoItem.helpers({
	ownTodo: function() {
		return this.userId === Meteor.userId();
	},
	commentsCount: function() {
		return Comments.find({todoId: this._id}).count();
	}
});