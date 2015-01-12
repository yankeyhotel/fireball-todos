Meteor.methods({
  /**
   * update a user's permissions
   *
   * @param {Object} targetUserId Id of user to update
   * @param {Array} roles User's new permissions
   * @param {String} group Company to update permissions for
   */
	updateRoles: function (targetUserId, roles, group) {
		var loggedInUser = Meteor.user()

		if (!loggedInUser || !Roles.userIsInRole(loggedInUser, ['super-admin'], group)) {
			throw new Meteor.Error(403, "Access denied");
		}

		Roles.setUserRoles(targetUserId, roles, group)
	}

});

// set me to admin
// Roles.addUsersToRoles("Cwc9dRETuhxGrkpyW", ['super-admin', 'web-developer']);

// create all other roles
// Roles.createRole("web-developer");
// Roles.createRole("designer");
// Roles.createRole("project-manager");
// Roles.createRole("admin");
// Roles.createRole("management");