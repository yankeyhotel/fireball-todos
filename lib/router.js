Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { return Meteor.subscribe('todos'); }
});



Router.route('/', {name: 'todosList'});

Router.route('/todos/:_id', {
	name: 'todoPage',
	data: function() {
		return Todos.findOne(this.params._id);
	}
});




Router.onBeforeAction('dataNotFound', {only: 'todoPage'});