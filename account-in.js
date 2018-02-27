// Meteor Mogul account template to show when already logged in

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Vue } from 'meteor/meteormogul:vue-dist';
import VueMeteorTracker from 'vue-meteor-tracker';
import Vuetify from 'vuetify';
import { displayName } from './helpers.js';

Vue.use(VueMeteorTracker);
Vue.use(Vuetify);

var loginButtonsSession = Accounts._loginButtonsSession;

var MMDEBUG = true;

var meteormogulLoggedIn = Vue.component('logged-in',
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

var _meteormogulLoginMessages = Vue.component('login-messages',
{
  name: 'login-messages',
  template: "#login-messages-template"
}
);

var _meteormogulChangePassword = Vue.component('change-password',
{
  name: 'change-password',
  template: "#change-password-template"
}
);

var _meteormogulLoggedInActions = Vue.component('logged-in-actions',
{
  name: 'logged-in-actions',
  template: "#logged-in-actions-template"
}
);

export { meteormogulLoggedIn };
