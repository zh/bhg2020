const EVENT_ID = 'CHANGE:SomeEvent'
const EVENT_TOKEN = 'CHANGE:--transaction-txid-1_created_event_token--'
const SIGNAL_TX = 'CHANGE:--signal-transaction-tx-3_attend_event--'

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

// account to pay transaction fees
let paymentAccount
try {
  paymentAccount = require('./attender.json')
} catch (err) {
  console.log(
    "Could not open attender.json: { address: 'bitcoincash:...', wif: '...'}"
  )
  process.exit(0)
}

async function testLib(account) {
  try {
    const attendConfig = {
      event: EVENT_ID,
      token: EVENT_TOKEN,
      signal: SIGNAL_TX,
      id: '1'
    }
    const attendTokenTx = await attender.Token.attendEvent(attendConfig, account, true)
    console.log(`token: ${JSON.stringify(attendTokenTx, null, 2)}`)
  } catch (error) {
    console.error('error in testLib: ', error)
  }
}

testLib(paymentAccount)
