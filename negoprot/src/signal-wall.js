const axios = require('axios')

class SignalWall {
  constructor (config) {
    this.bchjs = config.bchjs
    this.proto = config.proto

    const tmp = {}
    if (!config || !config.bitdbURL) tmp.bitdbURL = 'https://bitdb.bch.sx/'
    else tmp.bitdbURL = config.bitdbURL
    this.bitdbURL = tmp.bitdbURL
  }

  async offers(number = 100) {
    return this.signals(number, `${this.proto} OFF `)
  }

  async accepts(number = 100) {
    return this.signals(number, `${this.proto} ACC `)
  }

  async signals(address, number = 100, skip = 0, prefix = '') {
    try {
      const query = {
        v: 3,
        q: {
          find: {
            'in.e.a': address.split('bitcoincash:')[1],
            'out.b0': {
              'op': 106
            },
            'out.h1': '6d02'
          },
          limit: number,
          skip: skip
        },
        r: {
          f: '[ .[] | { txid: .tx.h, msg: .out[0].s2}]'
        }
      }
      const queryStr = JSON.stringify(query)
      const b64 = Buffer.from(queryStr).toString('base64')
      const url = `${this.bitdbURL}q/${b64}`
      // console.log(url)
      const options = {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        },
        url
      }
      const result = await axios(options)
      // only confirmed signals
      if (!result.data || !result.data.c || result.data.c.length === 0) {
        return []
      }
      const msgPrefix = prefix ? prefix : `${this.proto} `
      return result.data.c.filter(function(signal) {
        if (signal && signal.msg && signal.msg.startsWith(msgPrefix)) return true
        return false
      })
    } catch(error) {
      console.error('Error in signals: ', error)
      throw error
    }
  }

  // can take some time. be patient
  // 5 times * 100 records to return number of records
  async list(address, number = 10, prefix = '') {
    try {
      const TIMES = 5
      const VOLUME = 100

      if (number <= 0)
        throw new Error('Invalid list elements count')
      const totalSignals = []
      let totalNumber = 0
      for(let i = 0; i < TIMES; i++) {
        const iterSignals = await this.signals(address, VOLUME, i * VOLUME, prefix)
        if (iterSignals.length > 0)
          totalSignals.push(...iterSignals)
        // console.log(`n: ${number}, i: ${i}, c: ${totalSignals.length}`)
        if (totalSignals.length >= number)
          return totalSignals.slice(0, number)
      }
      return totalSignals
    } catch(error) {
      console.error('Error in signals: ', error)
      throw error
    }
  }
}

module.exports = SignalWall
