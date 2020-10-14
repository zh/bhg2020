# Negotiation Protocol Specification
# Signal, Watch, and Pay Protocol Specification
### Specification version: 0.1
### Date published: Oct 16, 2020
### Latest revision: Oct 16, 2020

## Author
Stoyan Zhekov

# 1. Background

## 1.1 Introduction

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
NP0 MTG C=Qm3423442              // meeting with external link
```


## 2.1 Signal Actions (verbs)

### 2.1.1 Message (MSG)

### 2.1.2 Offer (OFF)

### 2.1.3 Accept (ACC)

### 2.1.4 Cancel (CLS)

### 2.1.5 Search (SRH)

### 2.1.6 Meeting (MTG)

## 2.2 Payload

Alphanumeric, no spaces. Only one in the signal, next after the verb.

## 2.3 Links

### 2.3.1 Internal (on-chain) links

Pointing to other BCH blockchain transactions. Format `T=txid` , for example:

```
T=4ac42efc4d2c2a944e0bb11aba5de60438777a148adb6d0990328932e9218cab
```

### 2.3.2 External (off-chain) links

## 3. Process examples

## Reference Implementations

### Clients
None currently

### Libraries
[negoprot-js](https://github.com/zh/bhg2020/negoprot)



