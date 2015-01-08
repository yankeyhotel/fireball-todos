Template.todoPage.helpers({
	comments: function() {
		return Comments.find({todoId: this._id});
	}
})