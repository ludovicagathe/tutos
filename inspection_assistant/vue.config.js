module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: '',
  pages: {
    index: {
      entry: './src/main.js',
      template: './public/index.html',
      title: 'Inspection Assistant',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    config: {
      entry: './src/pages/Config/main.js',
      template: './public/index.html',
      title: 'Inspection Assistant - Config',
      filename: 'config.html',
      chunks: ['chunk-vendors', 'chunk-common', 'config']
    },
  }
}
