// Meteor Mogul account login selector
// Select which component to display depending on state

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Vue } from 'meteor/meteormogul:vue-dist';
import VueMeteorTracker from 'vue-meteor-tracker';
import Vuetify from 'vuetify';
import { displayName, getLoginServices } from './helpers.js';
import { meteormogulLoggedIn } from './account-in.js';
import { meteormogulLoggedOutWithServices,
         meteormogulLoggedOutNoServices } from './account-out.js';

Vue.use(VueMeteorTracker);
Vue.use(Vuetify);

var MMDEBUG = true;

meteormogulAccountLogin = Vue.component('account-login',
{
  name: 'account-login',
  template: '#account-login-template',
  data: function() {
    return {
      configurationLoaded: false,
      currentUser: null,
      displayName: null,
      loginServices: 0
    };
  },
  meteor: {
    configurationLoaded: {
      update() {
        // This is a reactive function that will change to
        // true when the login services have been configured
        MMDEBUG && console.log('loginServicesConfigured');
        return Accounts.loginServicesConfigured();
      }
    },
    currentUser: {
      update() {
        // Reactive function that will change to a user when logged in.
        return Meteor.user();
      }
    },
    displayName: {
      update() {
        // Reactive function that will change to user's display name
        // when logged in.
        return displayName();
      }
    },
    loginServices: {
      update() {
        // Reactive function that will change to array of login services.
        MMDEBUG && console.log('getLoginServices');
        return getLoginServices().length;
      }
    }
  }
}
);

// _meteormogulLoginSelector is a functional Vue component that
// selects which template to display based on Meteor.user()
var _meteormogulLoginSelector = Vue.component('login-selector',
{
  name: 'login-selector',
  functional: true,
  props: [
    'configurationLoaded',
    'currentUser',
    'displayName',
    'loginServices'
  ],
  render: function (createElement, context) {
    function selectComponent(currentUser,loginServices) {
      MMDEBUG && console.log('selecting login component');
      if (currentUser) {
        // We're already logged in.
        MMDEBUG && console.log('current user', currentUser);
        return meteormogulLoggedIn;
      } else {
        MMDEBUG && console.log('no current user');
        // Check to see if we have any login login services
        if (loginServices) {
          // Yes, we have login services.
          MMDEBUG && console.log('logged out with services', meteormogulLoggedOutWithServices);
          return meteormogulLoggedOutWithServices;
        } else {
          MMDEBUG && console.log('logged out no services', meteormogulLoggedOutNoServices);
          return meteormogulLoggedOutNoServices;
        }
      }
    }

    return createElement(
        selectComponent(context.props.currentUser,context.props.loginServices),
        {
          // I must be missing something.  This can't be the way to
          // pass down props...
          attrs: {
            configurationLoaded: context.props.configurationLoaded,
            currentUser: context.props.currentUser,
            displayName: context.props.displayName,
            loginServices: context.props.loginServices
          }
        },
        context.children
    );
  }
}
);

export { meteormogulAccountLogin };
