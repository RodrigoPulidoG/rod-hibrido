const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  remotes: {
    mfCards: "http://localhost:4201/remoteEntry.js",
    mfLogin: 'http://localhost:3000/remoteEntry.js',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    react: {
      singleton: true,
      strictVersion: true,
      requiredVersion: '^19.1.0'
    },
    'react-dom': {
      singleton: true,
      strictVersion: true,
      requiredVersion: '^19.1.0'
    },
  }
});
