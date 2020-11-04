const ADDR = 'bitcoincash: --put-address-to-send-the-signals-to--'

const MAINNET_API = 'https://free-main.fullstack.cash/v3/'
const SLPDB_API = 'https://slpdb.fountainhead.cash/'
const BITDB_URL = 'https://bitdb.bch.sx/'

const BCHJSEXT = require('bch-js-ext')
const bchjs = new BCHJSEXT({
  restURL: MAINNET_API,
  slpdbURL: SLPDB_API,
  apiToken: process.env.BCHJSTOKEN
})
const EventAttender = require('../src/attender')
const attender = new EventAttender({
  bchjs: bchjs,
  bitdbURL: BITDB_URL
})

async function testLib(address) {
  try {
    const signals = await attender.MP.meetings(address, 3)
    console.log(`last 3 list: ${JSON.stringify(signals, null, 2)}`)
  } catch (error) {
    console.error('error in testLib: ', error)
  }
}

testLib(ADDR)
