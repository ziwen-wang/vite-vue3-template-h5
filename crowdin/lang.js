const fs = require('fs')
const path = require('path')
const OpenCC = require('opencc')

const opencc = new OpenCC('s2twp.json')

const crowdinConfig = require(path.resolve(process.cwd(), './crowdin.hb.js'))
const sourcePath = path.join(crowdinConfig.basePath, crowdinConfig.sourcePath)

function getFiles(path, recursion = true) {
  const fileList = []
  const folderList = []
  const walk = function (path, fileList, folderList) {
    const files = fs.readdirSync(path)
    files.forEach(function (item) {
      const tmpPath = path + '/' + item
      const stats = fs.statSync(tmpPath)
      if (stats.isDirectory()) {
        if (recursion) {
          walk(tmpPath, fileList, folderList)
          folderList.push(tmpPath)
        }
      } else {
        fileList.push(tmpPath)
      }
    })
  }
  walk(path, fileList, folderList)
  return fileList
}

function writeFile(filePath, str, ecode = 'utf8') {
  fs.writeFileSync(filePath, str, ecode, function (error) {
    if (error) {
      console.log(error)
      return false
    }
  })
}

/**
 * 翻译中文/繁体
 *
 */
function glang(lang, convertter = v => v) {
  const targetPath = path.join(
    crowdinConfig.basePath,
    crowdinConfig.outputPath,
    `${lang}.json`
  )
  const files = getFiles(sourcePath)
  let messages = []
  files.forEach(filePath => {
    if (/\.json$/.test(filePath)) {
      const module = require(filePath)
      messages = messages.concat(module)
    }
  })
  const messageObj = {}
  messages.forEach(item => {
    messageObj[`{#${item}#}`] = convertter(item)
  })
  writeFile(targetPath, JSON.stringify(messageObj, null, 2))
}

/**
 * 创建排除中文后的所有待翻译语言
 *
 */
function glangs() {
  const langMaps = Reflect.ownKeys(crowdinConfig.languageMap)
  /* eslint-disable no-useless-escape */
  const regExp = new RegExp(`(${langMaps.join('|')})\.json`)
  console.log(regExp)
  // 源文件和目标文件目前放到了一个目录下面
  const targetpath = path.join(
    crowdinConfig.basePath,
    crowdinConfig.outputPath
  )
  const files = getFiles(targetpath)
  const langs = {}
  files.forEach(filePath => {
    if (regExp.test(filePath)) {
      const currentLang = RegExp.$1
      const module = require(filePath)
      if (!langs[currentLang]) {
        langs[currentLang] = {}
      }
      const formattedLang = Object.entries(module[currentLang]).reduce(
        (prevObj, [k, v]) => {
          prevObj[`{#${k}#}`] = v
          return prevObj
        },
        {}
      )
      Object.assign(langs[currentLang], formattedLang)
      fs.unlinkSync(filePath)
    }
  })
  Reflect.ownKeys(langs).forEach(lang => {
    writeFile(
      `${targetpath}/${lang}.json`,
      JSON.stringify(langs[lang], null, 2)
    )
  })
}

function gzhCNLang() {
  glang('zh-CN')
}

function gzhTWLang() {
  glang('zh-TW', v => opencc.convertSync(v))
}
function genUSLang() {
  glang('en-US')
}
function gAllLangs() {
  gzhCNLang()
  gzhTWLang()
  // genUSLang()
  glangs()
}

module.exports = {
  glang,
  gzhTWLang,
  gAllLangs
}
