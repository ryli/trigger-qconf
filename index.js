#!/usr/bin/env node

const qconf = require('node-qconf')
const path = require('path')
const { promisify } = require('util')

const sleep = setTimeout[promisify.custom]

if (process.argv.length < 3) {
  console.log('Missing conf path.')
  process.exitCode = 1
  process.exit()
}

const qconfPath = path.resolve('', process.argv[2])
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
        hostList.push(`${host}/slave`)
        hostList.push(`${host}/master`)

        confList.push(`${host}/password`)
        confList.push(`${host}/username`)
      })

    // conf 类型
    } else if (key === 'conf') {
      subList.forEach(conf => confList.push(conf))

    // 其他为 host 类型
    } else {
      subList.forEach(host => hostList.push(host))
    }
  })

  let index = 0
  do {
    index += 1
    result = true
    handle()
    if (index < execCount + 1) {
      await sleep(1000)
    }
    if (index > 1) {
      console.log('test', index)
    }
  } while (!result && index < execCount)

  if (result) {
    console.log('qconf test success')
    process.exitCode = 0
  } else {
    if (hostList.length) {
      console.log('failed host:\n', hostList.join('\n'))
    }
    if (confList.length) {
      console.log('failed host:\n', confList.join('\n'))
    }
    console.error('qconf test error')
    process.exitCode = 1
  }

  function handle(flag = '') {
    const currHostList = [...hostList]
    const currConfList = [...confList]

    currHostList.forEach(qconfPath => {
      const addr = qconf.getHost(qconfPath, flag)
      if (addr === null) {
        result = false
      } else {
        console.log('host:', qconfPath, addr)
        hostList.splice(hostList.findIndex(v => v === qconfPath), 1)
      }
    })

    currConfList.forEach(qconfPath => {
      const addr = qconf.getConf(qconfPath, flag)
      if (addr === null) {
        result = false
      } else {
        console.log('host:', qconfPath, addr)
        confList.splice(confList.findIndex(v => v === qconfPath), 1)
      }
    })

    return result
  }
}
