module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: '',
  pages: {
    index: {
      entry: './src/pages/Home/main.js',
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
    inspections: {
      entry: './src/pages/Inspections/main.js',
      template: './public/index.html',
      title: 'Inspection Assistant - Config',
      filename: 'inspections.html',
      chunks: ['chunk-vendors', 'chunk-common', 'config']
    },
    dealers: {
      entry: './src/pages/Dealers/main.js',
      template: './public/index.html',
      title: 'Inspection Assistant - Config',
      filename: 'dealers.html',
      chunks: ['chunk-vendors', 'chunk-common', 'config']
    },
  }
}
