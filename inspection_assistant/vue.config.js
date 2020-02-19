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
      title: 'Config',
      filename: 'config.html',
      chunks: ['chunk-vendors', 'chunk-common', 'config']
    },
    inspections: {
      entry: './src/pages/Inspections/main.js',
      template: './public/index.html',
      title: 'Inspections',
      filename: 'inspections.html',
      chunks: ['chunk-vendors', 'chunk-common', 'inspections']
    },
    inspection: {
      entry: './src/pages/Inspection/main.js',
      template: './public/index.html',
      title: 'Inspection',
      filename: 'inspection.html',
      chunks: ['chunk-vendors', 'chunk-common', 'inspection']
    },
    dealers: {
      entry: './src/pages/Dealers/main.js',
      template: './public/index.html',
      title: 'Inspection Assistant - Config',
      filename: 'dealers.html',
      chunks: ['chunk-vendors', 'chunk-common', 'dealers']
    },
    dealer: {
      entry: './src/pages/Dealer/main.js',
      template: './public/index.html',
      title: 'Dealer Inspection',
      filename: 'dealer.html',
      chunks: ['chunk-vendors', 'chunk-common', 'dealer']
    },
  }
}
