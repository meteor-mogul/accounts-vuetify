// Meteor Mogul account template to show when logged out
MMDEBUG = true;

import { Meteor } from 'meteor/meteor';
import { Vue } from 'meteor/meteormogul:vue-dist';
import VueMeteorTracker from 'vue-meteor-tracker';
import Vuetify from 'vuetify';
import { Accounts } from './account-session.js';
import { getLoginServices, elementValueById, validateEmail, validatePassword, login, signup } from './helpers.js';
import { loginButtonsMessages } from './account-components.js';

Vue.use(VueMeteorTracker);
Vue.use(Vuetify);

var loginButtonsSession = Accounts._loginButtonsSession;

var loginButtonsLoggedOutWithServices = Vue.component('logged-out-with-services',
{
  name: 'logged-out-with-services',
  template: '#logged-out-with-services-template',
  data: function () {
    return {
      dropdownVisible: false,
      loggingIn: false,
      inSignupFlow: false,
      errorMessage: null,
      infoMessage: null
    };
  },
  meteor: {
    loggingIn: {
      update() {
        this.loggingIn;
        //return Meteor.loggingIn();
      }
    },
    dropdownVisible: {
      update() {
        return loginButtonsSession.get('dropdownVisible');
      }
    },
    inSignupFlow: {
      update() {
        return loginButtonsSession.get('inSignupFlow');
      }
    },
    errorMessage: {
      update() {
        return loginButtonsSession.get('errorMessage');
      }
    },
    infoMessage: {
      update() {
        return loginButtonsSession.get('infoMessage');
      }
    }
  },
  methods: {
    toggleDropdown: function () {
      MMDEBUG && console.log('showDropdown');
      loginButtonsSession.set('dropdownVisible', !loginButtonsSession.get('dropdownVisible'));
    },
    showDropdown: function () {
      MMDEBUG && console.log('showDropdown');
      loginButtonsSession.set('dropdownVisible', true);
    },
    hideDropdown: function () {
      MMDEBUG && console.log('closeDropdown');
      loginButtonsSession.closeDropdown();
    },
    login: function () {
      MMDEBUG && console.log('login');
      loginButtonsSession.resetMessages();
      login();
    },
    createAccount: function () {
      MMDEBUG && console.log('create account');
      loginButtonsSession.resetMessages();
      let email = elementValueById('login-email');
      let password = elementValueById('login-password');
      loginButtonsSession.set('inSignupFlow',
      validateEmail(email) && validatePassword(password));
    },
    confirmAccount: function () {
      MMDEBUG && console.log('confirm account');
      loginButtonsSession.resetMessages();
      signup();
    },
    cancelAccount: function () {
      MMDEBUG && console.log('cancel account');
      loginButtonsSession.resetMessages();
      loginButtonsSession.set('inSignupFlow', false);
    }
  }
});

var loginButtonsLoggedOutNoServices = Vue.component('logged-out-no-services',
{
  name: 'logged-out-no-services',
  template: '#logged-out-no-services-template'
});

export { loginButtonsLoggedOutWithServices, loginButtonsLoggedOutNoServices };
