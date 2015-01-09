/* ------------------------------------------------------- 
 * Configure Routes
 * ------------------------------------------------------- */
 Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { 
		return [ Meteor.subscribe('todos'), Meteor.subscribe('notifications') ]; 
	}
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
	waitOn: function() {
		return Meteor.subscribe('comments', this.params._id);
	},
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
});

Router.route('/profile', {
	name: 'profile',
	data: function() { return Meteor.user(); }
});

Router.route('/manage-users', {
	name: 'manageUsers',
	waitOn: function() {
		return Meteor.subscribe('allUsers');
	}
});



/* ------------------------------------------------------- 
 * Account Routes
 * ------------------------------------------------------- */
AccountsTemplates.configureRoute('signIn', {
	name: 'signIn',
	path: '/signin',
	template: 'accountsSignIn',
	layoutTemplate: 'layout',
	redirect: '/profile',
});

AccountsTemplates.configureRoute('ensureSignedIn', {
    template: 'accountsSignIn',
    layoutTemplate: 'layout',
});



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


Router.onBeforeAction(AccountsTemplates.ensureSignedIn, {
    except: ['signIn', 'signUp', 'forgotPassword']
});

Router.onBeforeAction('dataNotFound', {only: 'todoPage'});
Router.onBeforeAction(requireLogin, {only: 'todoSubmit'});