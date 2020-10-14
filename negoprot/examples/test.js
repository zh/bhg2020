// account to pay the transaction fees
const SENDER = 'bitcoincash:__put_some_address_here'
const SENDER_WIF = 'K1.....'

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

async function testLib(account) {
  try {
    /*
    const offer = np.Signal.offer('JOB')
    offer.addTx('4ac42efc4d2c2a944e0bb11aba5de60438777a148adb6d0990328932e9218cab')
    offer.addCid('QmScwZZKbYN67U9QqjCP6pQVpjNwfBmQwXwMkyWuQ4YcNP')
    const tx = await offer.sendTx(account, true)
    console.log(`tx: ${JSON.stringify(tx, null, 2)}`)
    const offer = np.Signal.offer('JOB')
    offer.addTx('12345678901234567890123456789012')
    offer.addTx('12345678901234567890123456789012')
    offer.addCid('hdhb0qasfggbbvffffffgfffsxxcvbhjjhbfrfrvfffff53466gvcddffffff56454')
    offer.addCid('dhdhb0qasfggbbvffffffgfffsxxcvbhjjhbfrfrvfffff53466gvcddffffff56454')
    const msg = offer.toMessage()
    console.log(`message: ${msg} (${offer.length()})`)
    const tx = await offer.sendTx(account, true)
    const accept = np.Signal.accept('JOB')
    accept.addTx('4ac42efc4d2c2a944e0bb11aba5de60438777a148adb6d0990328932e9218cab')
    accept.addCid('QmScwZZKbYN67U9QqjCP6pQVpjNwfBmQwXwMkyWuQ4YcNP')
    console.log(`message: ${accept.toMessage()} (${accept.length()})`)
    const cancel = np.Signal.cancel('JOB')
    cancel.addTx('8b3d26120d81243d5719f7aea40e785cf94b3be25f12631fde445dac1b90d664')
    const tx = await cancel.sendTx(account, true)
    console.log(`tx: ${JSON.stringify(tx, null, 2)}`)
    const signals = (await np.SignalWall.signals()).map(s => ({
      txid: s.txid,
      signal: np.Signal.fromMessage(s.msg).toObj()
    }))
    console.log(`list: ${JSON.stringify(signals, null, 2)}`)
    */
    const signals = (await np.SignalWall.list(3)).map(s => ({
      txid: s.txid,
      signal: np.Signal.fromMessage(s.msg).toObj()
    }))
    console.log(`list: ${JSON.stringify(signals, null, 2)}`)
  } catch (error) {
    console.error('error in testLib: ', error)
  }
}

testLib(address: SENDER, wif: SENDER_WIF})
