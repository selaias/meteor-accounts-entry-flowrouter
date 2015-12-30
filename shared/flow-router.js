var accountsEntryRoutes = FlowRouter.group({
  prefix: '/accounts',
  triggersEnter: [trackRouteEntry],
  triggersExit: [trackRouteEntry]
});

function trackRouteEntry(context) {
  Alerts.clear();
}

function trackRouteClose(context) {

}

accountsEntryRoutes.route("/sign-in", {
  name: 'entrySignIn',
  triggersEnter: [function(context, redirect) {
    if (Meteor.userId()) {
      redirect(AccountsEntry.settings.dashboardRoute);
    }
    Session.set('buttonText', 'in');
  }],
  action: function() { 
    BlazeLayout.render(AccountsEntry.settings.layoutName, { 
      [AccountsEntry.settings.contentTemplateName]: 'entrySignIn'});
  }
});
accountsEntryRoutes.route("/sign-up", {
  name: 'entrySignUp',
  triggersEnter: [function(context, redirect) {
    Session.set('buttonText', 'up');
  }],
  action: function() {
    BlazeLayout.render(AccountsEntry.settings.layoutName, { 
      [AccountsEntry.settings.contentTemplateName]: 'entrySignUp'});
  }
});
accountsEntryRoutes.route("/forgot-password", {
  name: 'entryForgotPassword',
  action: function() {
    BlazeLayout.render(AccountsEntry.settings.layoutName, { 
      [AccountsEntry.settings.contentTemplateName]: 'entryForgotPassword'});
  }
});
accountsEntryRoutes.route('/sign-out', {
  name: 'entrySignOut',
  triggersEnter: [function(context, redirect) {
    Meteor.logout();
    if (AccountsEntry.settings.homeRoute) {
      redirect(AccountsEntry.settings.homeRoute);
    }
  }],
  action: function() {
    console.log('User signed out.')
  }
});
accountsEntryRoutes.route('/reset-password/:resetToken', {
  name: 'entryResetPassword',
  triggersEnter: [function(context, redirect) {
    Session.set('resetToken', this.params.resetToken);
  }],
  action: function() {
    BlazeLayout.render(AccountsEntry.settings.layoutName, { 
      [AccountsEntry.settings.contentTemplateName]: 'entryResetPassword'});
  }
});

accountsEntryRoutes.route('/verification-pending', {
  name: 'entryEmailVerificationPending',
  action: function() {
    BlazeLayout.render(AccountsEntry.settings.layoutName, { 
      [AccountsEntry.settings.contentTemplateName]: 'home'
    });
  }
});