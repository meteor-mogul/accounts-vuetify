import { Meteor } from 'meteor/meteor';
import { Vue } from 'meteor/meteormogul:vue-dist';
import VueMeteorTracker from 'vue-meteor-tracker';
import { Vuetify } from 'meteor/meteormogul:vuetify-dist';
import { displayName, getLoginServices } from './helpers.js';
import { Accounts } from './account-session.js';

Vue.use(VueMeteorTracker);
Vue.use(Vuetify);

loginButtonsSession = Accounts._loginButtonsSession;

var loginButtonsMessages = Vue.component('login-messages',
{
  name: 'login-messages',
  template: "#login-messages-template"
}
);

export { loginButtonsMessages };
