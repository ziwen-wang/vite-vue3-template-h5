module.exports = {
  basePath: require('path').resolve(__dirname, './'),
  sourcePath: './langs/key',
  project: '',
  key: '',
  id: '547543',
  authToken: '',
  dingdingRobot: false,
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
