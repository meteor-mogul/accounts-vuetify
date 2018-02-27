// Helper functions for Meteor Mogul accounts

import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

// Blank if no user, otherwise figure out how to display name of user.
var displayName = function () {
  var user = Meteor.user();
  if (!user)
    return '';

  if (user.profile && user.profile.name)
    return user.profile.name;
  if (user.username)
    return user.username;
  if (user.emails && user.emails[0] && user.emails[0].address)
    return user.emails[0].address;

  return 'User Incognito';
};

var hasPasswordService = function () {
  return !!Package['accounts-password'];
};

// Returns an array of the login services used by this app. Each
// element of the array is an object (eg {name: 'facebook'}).
//
// Don't cache the output of this function: if called during startup (before
// oauth packages load) it might not include them all.
var getLoginServices = function () {
  var self = this;

  // First look for OAuth services.
  var services = Package['accounts-oauth'] ? Accounts.oauth.serviceNames() : [];

  // Be equally kind to all login services. This also preserves
  // backwards-compatibility. (But maybe order should be
  // configurable?)
  services.sort();

  // Add password, if it's there; it must come last.
  if (hasPasswordService())
    services.push('password');

  return _.map(services, function(name) {
    return {name: name};
  });
};

export { displayName, getLoginServices };
