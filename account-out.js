// Meteor Mogul account template to show when logged out
MMDEBUG = true;

import { Meteor } from 'meteor/meteor';
import { Vue } from 'meteor/meteormogul:vue-dist';
import VueMeteorTracker from 'vue-meteor-tracker';
import Vuetify from 'vuetify';
import { Accounts } from './account-session.js';
import { getLoginServices } from './helpers.js';
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
      dropdownVisible: true,
      loggingIn: false
    };
  },
  meteor: {
    loggingIn: {
      update() {
        return Meteor.loggingIn();
      }
    },
    dropdownVisible: {
      update() {
        return loginButtonsSession.get('dropdownVisible');
      }
    }
  },
  methods: {
    showDropdown: function () {
      MMDEBUG && console.log('showDropdown');
      loginButtonsSession.set('dropdownVisible', true);
    },
    hideDropdown: function () {
      MMDEBUG && console.log('closeDropdown');
      loginButtonsSession.closeDropdown();
    }
  }
});

var loginButtonsLoggedOutNoServices = Vue.component('logged-out-no-services',
{
  name: 'logged-out-no-services',
  template: '#logged-out-no-services-template'
});

export { loginButtonsLoggedOutWithServices, loginButtonsLoggedOutNoServices };
