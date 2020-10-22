# Attend events

JavaScript library, using [Negotiation Protocol](../negoprot/negoprot-spec.md)
for organizing events, signaling attendance request and accepting NFT token as
  attendence confirmation. The orginizers and the attenders are isolated from each other and communicate only with signals (transactions) saved to the Bitcoin Cash blockchain.

## [WIP] Usage

### Installation

You need to install [negoprot](../negoprot/) first (in the future there will be NPM package for this). For now see [GitHub install instructions](../negoprot/README.md).

Next steps:

```sh
git clone https://github.com/zh/bhg2020.git
cd bhg2020/event_attend
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
const EventAttender = require('../src/attender')
const attender = new EventAttender({
  bchjs: bchjs,
  bitdbURL: BITDB_URL
})
```

For running the examples create account config files (see the provided examples) with account address and account WIF for transaction fees payments.

## Typical event (meeting etc.) flow


### 1. Create new meeting

Upload meeting data (place, time etc.) to IPFS and save the received hash - _'Qm.....'_

Create the new meeting NFT token - basically BCH NFT Group token

```js
const EVENT_ID = 'SomeEvent'
const POSTER_CID = 'Qm--event-data-on-IPFS--'
const eventTokenTx = await attender.Token.createEvent(EVENT_ID, account, POSTER_CID, true)
console.log(`token: ${JSON.stringify(eventTokenTx, null, 2)}`)
```
Save _eventTokenTx_ - you will need it for step 2 (signal creation)

see [`1_create_mtg_token.js`](examples/1_create_mtg_token.js) for more.


### 2. Signal everybody about the new meeting

Same data CID are used also for the signal, so attenders can access information easy.
Links pointing to that off-chain data and to the token transaction (on-chain data) are
added to the signal.

```js
const event = attender.MP.event(EVENT_ID)
event.onchain(EVENT_TOKEN)
event.offchain(POSTER_CID)
const signalTx = await event.saveOnChain(account, true)
console.log(`signal tx: ${JSON.stringify(signalTx, null, 2)}`)
```

see [`2_create_mtg.js`](examples/2_create_mtg.js) for more.

### 3. Somebody want to attend the meeting

The attender will need to send an attending signal with link to the meeting token (on-chain data) and also to provide an SLP address (address link) for receiving NFT attendance token.

```js
const event = attender.MP.attend(EVENT_ID)
event.onchain(EVENT_TOKEN)
event.wallet(slpAddress) // where to send attend NFT
const signalTx = await event.saveOnChain(account, true)
console.log(`signal tx: ${JSON.stringify(signalTx, null, 2)}`)
```

see [`3_attend_mtg.js`](examples/3_attend_mtg.js) for more.

### 4. Organizer send confirmation to the attender

NFT child token, minted from the meeting group token with attender ID is created and send to the
provided SLP address. This token can also be used for entrance checks etc.

_`SIGNAL_TX`_ is the attender signal transaction ID, which offers his/her will to participate in the event.

```js
const EVENT_ID = 'CHANGE:SomeEvent'
const EVENT_TOKEN = 'CHANGE:--transaction-txid-1_created_event_token--'
const SIGNAL_TX = 'CHANGE:--signal-transaction-tx-3_attend_event--'
const attendConfig = {
  event: EVENT_ID,
  token: EVENT_TOKEN,
  signal: SIGNAL_TX,
  id: '42'
}
const attendTokenTx = await attender.Token.attendEvent(attendConfig, account, true)
console.log(`token: ${JSON.stringify(attendTokenTx, null, 2)}`)
```

There is still no automatic token sending implemented, but it can be sended from/to usual wallets as any regular SLP token.

see [`4_create_attend_token.js`](examples/4_create_attend_token.js) for more.

For more complete examples see the [examples directory](examples/).

## TODO

* Create a nice frontend for the process automation
* Some additional tools for searching on-chain events information
