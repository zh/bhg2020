class Tokenizer {
  constructor(config) {
    this.bchjs = config.bchjs
  }

  async createEvent(eventId, account, offchain = '', send = false) {
    try {
      const configObj = {
        name: `NP0 EVENT ${eventId}`,
        ticker: `np.event.${eventId}`
      }
      if (offchain !== '') {
        configObj.url = offchain
      }
      return await this.bchjs.NFT.createGroup(account, configObj, send)
    } catch (error) {
      console.error('Error in createEvent: ', error)
      console.log(`eventId: ${eventId}`)
      throw error
    }
  }

  // config = { event:, token:, signal:, id:, url: }
  async attendEvent(eventConfig, account, send = false) {
    try {
      const configObj = {
        group: eventConfig.token,
        name: `NP0 ATTEND ${eventConfig.event} ${eventConfig.id}`,
        ticker: `np.attend.${eventConfig.event}.${eventConfig.id}`,
        url: eventConfig.signal
      }
      return await this.bchjs.NFT.createChild(account, configObj, send)
    } catch (error) {
      console.error('Error in attendEvent: ', error)
      console.log(`eventId: ${eventConfig.event}`)
      throw error
    }
  }
}

module.exports = Tokenizer
