// Meteor Mogul account template to show when already logged in
var MMDEBUG = true;

import { Meteor } from 'meteor/meteor';
import { Vue } from 'meteor/meteormogul:vue-dist';
import VueMeteorTracker from 'vue-meteor-tracker';
import Vuetify from 'vuetify';
import { Accounts } from './account-session.js';
import { displayName } from './helpers.js';
import { loginButtonsMessages } from './account-components.js';

Vue.use(VueMeteorTracker);
Vue.use(Vuetify);

loginButtonsSession = Accounts._loginButtonsSession;

var loginButtonsLoggedIn = Vue.component('logged-in',
{
  name: 'logged-in',
  template: "#logged-in-template",
  data: function () {
    return {
      displayName: null,
      dropdownVisible: false,
      inMessageOnlyFlow: false,
      inChangePasswordFlow: false
    }
  },
  meteor: {
      displayName: {
        update () {
          return displayName();
        }
      },
      dropdownVisible: {
        update() {
          MMDEBUG && console.log("loginButtonsSession", loginButtonsSession);
          return loginButtonsSession.get('dropdownVisible');
        }
      },
      inMessageOnlyFlow: {
        update() {
          return loginButtonsSession.get('inMessageOnlyFlow');
        }
      },
      inChangePasswordFlow: {
        update() {
          return loginButtonsSession.get('inChangePasswordFlow');
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
}
);

var _loginButtonsChangePassword = Vue.component('change-password',
{
  name: 'change-password',
  template: "#change-password-template"
}
);

var _loginButtonsInActions = Vue.component('logged-in-actions',
{
  name: 'logged-in-actions',
  template: "#logged-in-actions-template"
}
);

export { meteormogulLoggedIn };
