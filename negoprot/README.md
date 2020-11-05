# Negotiation Protocol

JavaScript library implementation of the [Negotiation Protocol](negoprot-spec.md) for building and quering BCH transactions, used for agreement negotiation between independent sides.

## [WIP] Usage

### Installation

For now the library will be installed from the GitHub repository:

```sh
git clone https://github.com/zh/bhg2020.git
cd bhg2020/negoprot
npm link
cd ../other-dir
npm link negoprot-js
```

_TODO: create npm package and then:_

```sh
npm install negoprot-js
```

###

### Library instantiation


```js
const BCHJSEXT = require('bch-js-ext')
const bchjs = new BCHJSEXT({
  restURL: MAINNET_API,
  slpdbURL: SLPDB_API,
  apiToken: process.env.BCHJSTOKEN
})

const NP = require('negoprot')
const np = new NP({
  bchjs: bchjs,
  bitdbURL: BITDB_URL
})

```

### Search for job

```
const search = np.Signal.search('JOB_SystemEngineer')
search.addCid('QmScwZZKbYN67U9QqjCP6pQVpjNwfBmQwXwMkyWuQ4YcNP') // job resume on IPFS
const tx = await search.sendTx(account, true) // TxID = 4ac42efc4d2c2...
```

### Create job offer

```js
const offer = np.Signal.offer('JOB_SE_IBM')
offer.addTx('4ac42efc4d2c2...') // link to search signal TX above
offer.addCid('QmScwZZKbYN67U9QqjCP6pQVpjNwfBmQwXwMkyWuQ4YcNP') // job information on IPFS
const tx = await offer.sendTx(account, true) // TxID = 8b3d26120d81243...
```

### Accept the job offer

```js
const accept = np.Signal.accept('JOB_SE_IBM')
accept.addTx('8b3d26120d81243...') // link to offer TX above
console.log(`message: ${accept.toMessage()} (${accept.length()})`)
```

### List last 10 signals in JSON format

```js
const address='bitcoincash:qq....'
const signals = (await np.SignalWall.list(address, 10)).map(s => ({
  txid: s.txid,
  signal: np.Signal.fromMessage(s.msg).toObj()
}))
console.log(`list: ${JSON.stringify(signals, null, 2)}`)
```


For more information see the [examples directory](examples/).
