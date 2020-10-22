const EVENT_ID = 'CHANGE:SomeEvent'
const EVENT_TOKEN = 'CHANGE:--transaction-txid-1_create_event_token'

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
    "Could not open attender.json: { address: 'bitcoincash:...', wif: '...', slp: 'simpleledger:...'}"
  )
  process.exit(0)
}

async function testLib(account) {
  try {
    const event = attender.MP.attend(EVENT_ID)
    event.onchain(EVENT_TOKEN)
    event.wallet(account.slp) // where to send attend NFT
    console.log(`signal: ${JSON.stringify(event.debug(), null, 2)}`)
    const signalTx = await event.saveOnChain(account, true)
    console.log(`signal tx: ${JSON.stringify(signalTx, null, 2)}`)
  } catch (error) {
    console.error('error in testLib: ', error)
  }
}

testLib(paymentAccount)
