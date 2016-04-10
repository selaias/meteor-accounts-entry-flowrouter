if (typeof AccountsEntry === "undefined") {
  AccountsEntry = {};
}

AccountsEntry = {
  settings: {
    layoutName: "",
    contentTemplateName: "",
    wrapLinks: true,
    homeRoute: '/home',
    dashboardRoute: '/dashboard',
    passwordSignupFields: 'EMAIL_ONLY',
    emailToLower: true,
    usernameToLower: false,
    entrySignUp: '/sign-up',
    emailVerificationPendingRoute: '/verification-pending',
    extraSignUpFields: [],
    showOtherLoginServices: true,
    requirePasswordConfirmation: true,
    waitEmailVerification: true
  },
  isStringEmail(email) {
    var emailPattern;
    emailPattern = /^([\w.-]+)@([\w.-]+)\.([a-zA-Z.]{2,6})$/i;
    if (email.match(emailPattern)) {
      return true;
    } else {
      return false;
    }
  },
  config(appConfig) {
    let signUpRoute;
    this.settings = _.extend(this.settings, appConfig);
    i18n.setDefaultLanguage = "en";
    if (appConfig.language) {
      i18n.setLanguage = appConfig.language;
    }
    if (appConfig.signUpTemplate) {
      signUpRoute = Router.routes['entrySignUp'];
      return signUpRoute.options.template || appConfig.signUpTemplate;
    }
  },
  signInRequired(router, extraCondition) {
    if (extraCondition === null) {
      extraCondition = true;
    }
    if (!Meteor.user()){
      Session.set('fromWhere', router.url);
      FlowRouter.go('/accounts/sign-in');
      Session.set('entryError', i18n('error.signInRequired'));
    }
  }
};
