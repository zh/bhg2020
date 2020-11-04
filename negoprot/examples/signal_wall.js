const MAINNET_API = 'https://free-main.fullstack.cash/v3/'
const SLPDB_API = 'https://slpdb.fountainhead.cash/'
const BITDB_URL = 'https://bitdb.bch.sx/'

const BCHJSEXT = require('bch-js-ext')
const bchjs = new BCHJSEXT({
  restURL: MAINNET_API,
  slpdbURL: SLPDB_API,
  apiToken: process.env.BCHJSTOKEN
})
const NP = require('../src/np')
const np = new NP({
  bchjs: bchjs,
  bitdbURL: BITDB_URL
})

// account to pay transaction fees
let paymentAccount
try {
  paymentAccount = require('./account.json')
} catch (err) {
  console.log(
    "Could not open account.json: { address: '...', wif: '...'}"
  )
  process.exit(0)
}

async function testLib(account) {
  try {
    // create some signals first
    let signals = (await np.SignalWall.signals(account.address)).map(s => ({
      txid: s.txid,
      signal: np.Signal.fromMessage(s.msg).toObj()
    }))
    console.log(`wall: ${JSON.stringify(signals, null, 2)}`)
    // display last 3 signals
    signals = (await np.SignalWall.list(account.address, 3)).map(s => ({
      txid: s.txid,
      signal: np.Signal.fromMessage(s.msg).toObj()
    }))
    console.log(`last 3 list: ${JSON.stringify(signals, null, 2)}`)
  } catch (error) {
    console.error('error in testLib: ', error)
  }
}

testLib(paymentAccount)
