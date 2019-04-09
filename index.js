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
  let result = null

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
    handle()
    if (index < execCount) {
      await sleep(1000)
    }
  } while (!result && index < execCount)

  if (result) {
    console.log('qconf test success')
    process.exitCode = 0
  } else {
    console.error('qconf test error')
    process.exitCode = 1
  }

  function handle(flag = '') {
    hostList.forEach(qconfPath => {
      const addr = qconf.getHost(qconfPath, flag)
      console.log('host:', qconfPath, addr)
      if (addr === null) result = false
    })

    confList.forEach(qconfPath => {
      const addr = qconf.getConf(qconfPath, flag)
      console.log('conf:', qconfPath, addr)
      if (addr === null) result = false
    })

    result = result === null
    return result
  }
}
