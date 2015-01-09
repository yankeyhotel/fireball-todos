Template.manageUsers.helpers({
	allUsers: function() {
		return Meteor.users.find();
	}
});

Template.manageUser.helpers({
	allRoles: function() {
		return Roles.getAllRoles();
	}
});