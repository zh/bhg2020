# Negotiation Protocol Specification

### Specification version: 0.2
### Date published: Oct 16, 2020
### Latest revision: Oct 23, 2020

## Author
Stoyan Zhekov

# 1. Background

## 1.1 Introduction

A very simple protocol for negotiations between decoupled parts via signals, saved to the Bitcoin Cash blockchain. Can be used for a wide range of appliocations - job offers, meetings attendance, package tracking etc.

## 1.2 Requirements

* ***Peer-To-Peer.*** No trusted third party should be required to enable communication between collaborating parties.
* ***Permissionless.*** There should be no limits on which network participants are able to participate in any given collaborative transaction.
* ***Trustless.*** Parties' funds should be secure and not subject to be spent other than in the manner intended by a given participant.
* ***Non-Invasive.*** It should require no changes to the underlying Bitcoin Cash protocol.
* ***Extensible.*** The system should allow for new classes of collaborative transactions as the network evolves

# 2. Protocol

Implemented as a single `OP_RETURN` BCH transaction. The current version of the protocol is based on memo.cash protocol (0x6d02 - messages) for the more easy presentation. The future versions maybe will be implemented as an independent protocols, with their own ID

```
<Protocol ID> <Verb> [Payload] [Links...]
```

* All parts of the protocol are separated by spaces
* Only the first two (ProtocolID and Verb) are required.
* Protocol ID is **NP0** - all signals will start with this identifier.

### Examples

```
NP0 MSG envrypted_message_here   // message
NP0 OFF T=123123131              // offer type with internal link
NP0 ACC T=123123131 C=Qm3423442  // accept type with internal and external links
```


## 2.1 Signal Actions (verbs)

### 2.1.1 Message (MSG)

General signal. Can be used for everything. Good to have a payload (message text
etc.)

### 2.1.2 Offer (OFF)

Offering some service (membership, job, meeting etc.). Links can contain onchain
(NFT token id etc.) or off-chain (IPFS saved data).

### 2.1.3 Accept (ACC)

Accept offer (membership, job, attend meeting etc.). Links can contain onchain
(NFT token id etc.) or off-chain (IPFS saved data). One of the links is better
to be the link to the offer transaction.

### 2.1.4 Cancel (CLS)

Cancel some service - membership, refuse job offer etc. Links can contain onchain
(NFT token id etc.) or off-chain (IPFS saved data). One of the links is better
to be the link to the offer transaction.

## 2.2 Payload

_(optional)_

Alphanumeric, no spaces. Only one in the signal, next after the verb.
Description of the signal. Will be used for searching etc.

## 2.3 Links

_(optional)_

Create connections between pieces of data:

* on-chain (transactions)
* off-chain (IPFS saved media, JSON data etc.)
* wallet addresses - for example for NFT distribution

### 2.3.1 Internal (on-chain) links

Pointing to other BCH blockchain transactions, represented by transaction ID.
Format `T=txid` , for example:

```
T=4ac42efc4d2c2a944e0bb11aba5de60438777a148adb6d0990328932e9218cab
```

### 2.3.2 External (off-chain) links

Pointing to off-chain data (for now IPFS), represented by data CID.
Format `C=cid`, for example:

```
C=QmScwZZKbYN67U9QqjCP6pQVpjNwfBmQwXwMkyWuQ4YcNP
```

### 2.3.3 Wallet addresses

Pointing to wallet address on some blockchain. Format `A=protocol:address` , for example:

```
A=bitcoincash:bitcoincash:qp5tyls823hx0hzukjuc69ydrv34wlud3q824kvgmr
A=simpleledger:qp9rdq4mffms5xs64f0ek5pqm2z3zycsrq76uq3z57
```

## 3. Process examples

## Reference Implementations

### Clients
None currently

### Libraries
[negoprot-js](https://github.com/zh/bhg2020/negoprot)
