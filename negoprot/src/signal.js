const VERBS = {
  message: 'MSG',
  offer: 'OFF',
  accept: 'ACC',
  cancel: 'CLS',
  search: 'SRH',
  meeting: 'MTG'
}
const MSGLIMIT = 217 // ptoto + verb + message

class Signal {
  constructor (config) {
    this.bchjs = config.bchjs
    this.proto = config.proto
    this.links = []
    this.verb = ''
    this.payload = ''
  }

  message(payload, action = 'message') {
    this.links = []
    this.verb = VERBS[action]
    this.addPayload(payload)
    return this
  }

  offer(payload = '') {
    return this.message(payload, 'offer')
  }

  accept(payload = '') {
    return this.message(payload, 'accept')
  }

  cancel(payload = '') {
    return this.message(payload, 'cancel')
  }

  search(payload = '') {
    return this.message(payload, 'search')
  }

  meeting(payload = '') {
    return this.message(payload, 'meeting')
  }

  addPayload(payload = '') {
    const newLength = this.length() + payload.length + 1
    if (payload !== '' && payload.match(/^[0-9a-zA-Z]+$/) && newLength < MSGLIMIT) {
      this.payload = payload
    }
  }

  addTx(txid) { return this.addLink(txid, 'T') }
  addCid(cid) { return this.addLink(cid, 'C') }

  addLink(target, type) {
    try {
      if (!target.match(/^[0-9a-zA-Z]+$/))
        throw new Error('target cannot include blanks')
      const newLength = this.length() + target.length + 3
      if (newLength >= MSGLIMIT)
        throw new Error(`message ${MSGLIMIT} length limit exceeded: ${newLength} chars now`)
      this.links.push({type: type, target: target})
    } catch (error) {
      console.error('Error in addLink(): ', error)
      console.log(`(${type}) ${target}`)
      throw error
    }
  }

  length() {
    return this.toMessage().length
  }

  toMessage() {
    let msg = `${this.proto} ${this.verb}`
    if (this.payload !== '') msg = `${msg} ${this.payload}`
    this.links.forEach(function(link) {
      msg = `${msg} ${link.type}=${link.target}`
    })
    return msg
  }

  toObj() {
    const jsonObj = {
      verb: this.verb,
      links: this.links
    }
    if (this.payload !== '') jsonObj.payload = this.payload
    return jsonObj
  }

  toJSON() { return JSON.stringify(this.toObj(), null, 2) }

  fromMessage(message) {
    try {
      // protocol
      if (!message.startsWith(`${this.proto} `))
        throw new Error('Not proper NP message')

      const tokens = message.split(' ')
      // verb
      if (!Object.values(VERBS).includes(tokens[1]))
        throw new Error('Not proper message type')
      this.verb = tokens[1]
      // optional payload
      let paramsIdx = 2
      if (!tokens[2].startsWith('T=') && !tokens[2].startsWith('C=')) {
        this.payload = tokens[2]
        paramsIdx = 3
      }

      const links = []
      tokens.slice(paramsIdx).forEach(function(token) {
        const parts = token.split('=')
        if (parts[0] &&
            parts[1] &&
            parts[0].length > 0 &&
            parts[1].length > 0 &&
            ['T', 'C'].includes(parts[0]))
          links.push({type: parts[0], target: parts[1]})
      })
      this.links = links
      return this
    } catch(error) {
      console.error('Error in fromMessage(): ', error)
      throw error
    }
  }

  // account = { address: 'bitcoincash:....', wif: 'L1.....' }
  async sendTx(account, send = false) {
    try {
      const utxo = await this.bchjs.Ext.findPaymentUtxo(account.address)
      const txBuilder = new this.bchjs.TXBuilder(this.bchjs)
      const fee = this.bchjs.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 2 })
      const remainder = utxo.value - 2 * fee
      if (utxo.value < fee) throw new Error(`Could not pay ${2 * fee} satoshi fee`)
      const script = [
        this.bchjs.Script.opcodes.OP_RETURN,
        Buffer.from('6d02', 'hex'),
        Buffer.from(this.toMessage())
      ]
      const data = this.bchjs.Script.encode(script)

      const outputs = [
        { out: data },
        { out: account.address, value: remainder }
      ]
      const inputs = [{utxo: utxo}]

      txBuilder.addOutputs(outputs)
      txBuilder.addSignedInputs(account.wif, inputs)
      return txBuilder.sendTx(send)
    } catch(error) {
      console.error('Error in sendTx(): ', error)
      throw error
    }
  }
}

module.exports = Signal
