// Meteor Mogul account template to show when logged out

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Vue } from 'meteor/meteormogul:vue-dist';
import VueMeteorTracker from 'vue-meteor-tracker';
import Vuetify from 'vuetify';
import { getLoginServices } from './helpers.js';

Vue.use(VueMeteorTracker);
Vue.use(Vuetify);

var loginButtonsSession = Accounts._loginButtonsSession;

MMDEBUG = true;

var meteormogulLoggedOutWithServices = Vue.component('logged-out-with-services',
{
  name: 'logged-out-with-services',
  template: '#logged-out-with-services-template'
});

var meteormogulLoggedOutNoServices = Vue.component('logged-out-no-services',
{
  name: 'logged-out-no-services',
  template: '#logged-out-no-services-template'
});

export { meteormogulLoggedOutWithServices, meteormogulLoggedOutNoServices };
