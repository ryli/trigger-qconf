#!/usr/bin/env node

const qconf = require('node-qconf')
const path = require('path')
const { promisify } = require('util')

const sleep = setTimeout[promisify.custom]

if (process.argv.length < 3) {
  console.error('Missing file params.')
  process.exit(1)
}

const qconfPath = path.resolve('', process.argv[2])
const flag = process.argv[3] ? process.argv[3] : ''

const qconfMap = require(qconfPath)

exec()

async function exec() {
  // 测试次数
  const execCount = 3
  let result = true

  const hostList = []
  const confList = []
  const keyList = Object.keys(qconfMap)

  keyList.forEach(key => {
    const subList = Object.values(qconfMap[key])
    // 处理 mysql
    if (key === 'mysql') {
      subList.forEach(host => {
        const key = typeof host === 'string' ? host : host.qconf
        hostList.push(path.join(key, 'master'))
        hostList.push(path.join(key, 'slave'))
        confList.push(path.join(key, 'password'))
        confList.push(path.join(key, 'username'))
      })
    } else if (['conf', 'kafka'].includes(key)) {
      confList.push(...subList)
    } else if (key === 'host') {
      hostList.push(...subList)
    } else {
      console.error(`Unknown key: ${key} ${subList.join(',')}\n`)
    }
  })

  let index = 0
  do {
    index += 1
    result = true
    handle()
    if (!result && index < execCount + 1) {
      await sleep(100)
    }
  } while (!result && index < execCount)

  if (result) {
    console.log('\nSuccess!')
    process.exitCode = 0
  } else {
    if (hostList.length) {
      console.error('failed host:\n', hostList.join('\n'))
    }
    if (confList.length) {
      console.error('failed conf:\n', confList.join('\n'))
    }
    console.error('\nFailed!')
    process.exitCode = 1
  }

  function handle() {
    const currHostList = [...hostList]
    const currConfList = [...confList]

    currHostList.forEach(qconfPath => {
      const addr = qconf.getHost(qconfPath, flag)
      if (addr === null) {
        result = false
      } else {
        console.log('host:', qconfPath, '-->', addr)
        hostList.splice(hostList.findIndex(v => v === qconfPath), 1)
      }
    })

    currConfList.forEach(qconfPath => {
      const addr = qconf.getConf(qconfPath, flag)
      if (addr === null) {
        result = false
      } else {
        console.log('host:', qconfPath, '-->', addr)
        confList.splice(confList.findIndex(v => v === qconfPath), 1)
      }
    })

    return result
  }
}
