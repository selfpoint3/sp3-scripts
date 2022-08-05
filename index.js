const storybookBoilerplate = require('./src/storybookBoilerplate')
const sp3WebpackPlugin = require('./src/sp3-webpack-plugin')
const discoverExports = require('./src/discoverExports')

module.exports = {
    storybookBoilerplate : storybookBoilerplate.default,
    sp3WebpackPlugin: sp3WebpackPlugin.default,
    discoverExports: discoverExports.default
}