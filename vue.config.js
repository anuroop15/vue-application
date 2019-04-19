
// vue configuration goes here
module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Index Page',
      chunks: ['chunk-vendor', 'index']
    }
  },
  css: {
    modules: true
  }
}
