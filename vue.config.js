
// vue configuration goes here
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/production-sub-path/'
    : '/',
    lintOnSave: process.env.NODE_ENV !== 'production'
}
