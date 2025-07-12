const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  remotes: {
    mfCards: "http://localhost:4201/remoteEntry.js",
    // reactApp: "http://localhost:4202/remoteEntry.js"
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })
  }
});
