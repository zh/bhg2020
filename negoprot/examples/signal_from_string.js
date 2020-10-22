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
    let offer = np.Signal.offer()
    offer.fromMessage(`NP0 OFF JOB123 T=123456789 C=Qm9876543 A=${account.address}`)
    console.log(`json: ${JSON.stringify(offer.toObj(), null, 2)}`)
    const tx = await offer.sendTx(account)
    console.log(`tx hex: ${JSON.stringify(tx, null, 2)}`)
  } catch (error) {
    console.error('error in testLib: ', error)
  }
}

testLib(paymentAccount)
