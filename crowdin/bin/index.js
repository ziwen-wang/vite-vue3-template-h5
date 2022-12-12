#!/usr/bin/env node
// const { chalk, semver } = require('@vue/cli-shared-utils')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const { Command } = require('commander')
const program = new Command()

program.command('glang [lang]').action((lang = 'all') => {
  const Langs = require(resolve('../lang'))
  if (lang !== 'all') {
    Langs.glang(lang)
  } else if (lang === 'zh-TW') {
    Langs.gzhTWLang()
  } else {
    Langs.gAllLangs()
  }
})

program.command('create <app-name>').action(appName => {
  console.log(`project name: ${appName}`)
  require('../src/create')(appName)
})

// program.version(`svf-cli ${require('../package').version}`, '-v, --version')

program.parse(process.argv)
