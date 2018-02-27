Package.describe({
  name: 'meteormogul:accounts-vuetify',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Accounts for Meteor Mogul using vuetify.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/meteor-mogul/accounts-vuetify.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Npm.depends({
  'vue-meteor-tracker': '1.2.3',
  'vuetify': '1.0.3'
});

Package.onUse(function(api) {
  api.versionsFrom('1.6.1');
  api.use('ecmascript');
  api.imply('accounts-base@1.4.1', ['client', 'server']);
  api.use('accounts-password@1.5.0', {weak: true});

  // Allow us to use VueJS components on the client
  api.use('meteormogul:vue-dist@2.5.15', 'client');

  // Don't compile Blaze templates in .html files
  api.use('static-html@1.2.2', 'client');

  api.addFiles([
    'account-in.html',
    'account-out.html',
    'account-login.html',
    'account-in.js',
    'account-out.js',
    'account-login.js'
  ], 'client');

  api.mainModule('accounts-vuetify.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('accounts-vuetify');
  api.mainModule('accounts-vuetify-tests.js');
});