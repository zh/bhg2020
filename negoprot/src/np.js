const Signal = require('./signal')
const SignalWall = require('./signal-wall')

class NP {
  constructor (config) {
    const npConfig = config
    npConfig.proto = 'NP0'

    this.Signal = new Signal(npConfig)
    this.SignalWall = new SignalWall(npConfig)
  }
}

module.exports = NP
