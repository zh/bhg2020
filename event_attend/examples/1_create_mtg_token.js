const EVENT_ID = 'SomeEvent'
const POSTER_CID = 'Qm--event-data-on-IPFS--'

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
  paymentAccount = require('./organizer.json')
} catch (err) {
  console.log(
    "Could not open organizer.json: { address: 'bitcoincash:...', wif: '...'}"
  )
  process.exit(0)
}

async function testLib(account) {
  try {
    const eventTokenTx = await attender.Token.createEvent(EVENT_ID, account, POSTER_CID, true)
    console.log(`token: ${JSON.stringify(eventTokenTx, null, 2)}`)
  } catch (error) {
    console.error('error in testLib: ', error)
  }
}

testLib(paymentAccount)
