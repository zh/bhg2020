const NP = require('negoprot-js')

class MeetingProtocol {
  constructor(config) {
    this.np = new NP(config)
    this.message = this.np.Signal.message(config.eventId ? config.eventId : '')
    this.message.verb = 'MTG'
  }

  event(eventId = '') {
    this.message.verb = 'MTG'
    this.message.addPayload(eventId)
    return this
  }

  attend(eventId = '') {
    this.message.verb = 'ATT'
    this.message.addPayload(eventId)
    return this
  }

  // make it init from raw Tx (param = txid)
  initFromChain(message) {
    const allowedVerbs = this.message.allowedVerbs()
    allowedVerbs.track = 'MTG'
    allowedVerbs.attend = 'ATT'
    this.message = this.message.fromMessage(message, allowedVerbs)
    return this
  }

  async saveOnChain(account, send = false) {
    return this.message.sendTx(account, send)
  }

  onchain(txid) { return this.message.addTx(txid) }
  offchain(cid) { return this.message.addCid(cid) }
  wallet(address) { return this.message.addAddr(address) }
  debug() { return this.message.toObj() }
}

module.exports = MeetingProtocol
