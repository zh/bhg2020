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

  // class method?
  async list(address, number = 10, prefix = '') {
    const signals = (await this.np.SignalWall.list(address, number, prefix)).map(s => ({
      txid: s.txid,
      signal: this.np.Signal.fromMessage(s.msg, ['MTG', 'ATT']).toObj()
    }))
    return signals
  }

  async meetings(address, number = 10, prefix = '') {
    let signals = await this.list(address, number, prefix)
    return signals.filter(function (s) {
      if (s && s.signal && s.signal.verb === 'MTG') return true
      return false
    })
  }

  async atendees(address, number = 10, prefix = '') {
    let signals = await this.list(address, number, prefix)
    return signals.filter(function (s) {
      if (s && s.signal && s.signal.verb === 'ATT') return true
      return false
    })
  }

  onchain(txid) { return this.message.addTx(txid) }
  offchain(cid) { return this.message.addCid(cid) }
  wallet(address) { return this.message.addAddr(address) }
  debug() { return this.message.toObj() }
}

module.exports = MeetingProtocol
