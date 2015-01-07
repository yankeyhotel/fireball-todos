/* ------------------------------------------------------- 
 * Configure Routes
 * ------------------------------------------------------- */
 Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { 
		return [ Meteor.subscribe('todos'), Meteor.subscribe('comments') ]; }
});



/* ------------------------------------------------------- 
 * Router Controllers
 * ------------------------------------------------------- */



/* ------------------------------------------------------- 
 * Application Routes
 * ------------------------------------------------------- */
Router.route('/', {name: 'todosList'});

Router.route('/todos/:_id', {
	name: 'todoPage',
	data: function() {
		return Todos.findOne(this.params._id);
	}
});

Router.route('/submit', {
	name: 'todoSubmit'
});

Router.route('/edit/:_id', {
	name: 'todoEdit',
	data: function() { return Todos.findOne(this.params._id); }
})


/* ------------------------------------------------------- 
 * Functions for onBeforeActions
 * ------------------------------------------------------- */
var requireLogin = function(){
	if (! Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
}

Router.onBeforeAction('dataNotFound', {only: 'todoPage'});
Router.onBeforeAction(requireLogin, {only: 'todoSubmit'});