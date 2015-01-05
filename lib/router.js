Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return Meteor.subscribe('todos'); }
});

Router.route('/', {name: 'todosList'});