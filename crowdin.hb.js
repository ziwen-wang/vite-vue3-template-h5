module.exports = {
  basePath: require('path').resolve(__dirname, './src'),
  sourcePath: './langs/key',
  project: 'mepal',
  key: '',
  outputPath: './langs/lib',
  filePrefix: 'keys',
  gkeysSuffix: ['.js', '.vue'],
  keyPattern: /^P_[a-zA-Z0-9-_]+:/,
  languageMap: {
    'en-US': {
      crowdin: 'en'
    }
  }
}
