const MP = require('./meeting-protocol')
const Token = require('./tokenizer')

class EventAttender {
  constructor (config) {
    this.MP = new MP(config)
    this.Token = new Token(config)
  }
}

module.exports = EventAttender
