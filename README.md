# Decentralized Membership Management

Block Hack Global 2020 Project

## Objectives

The project will try to implement decoupled system of independent sides, negotiating with each other via signals, saved to BCH blockchain. Such system does not have a central site and some URL when the software to be installed. Instead there will be many independent parts as:

* Media files (job descriptions, resumes, video, etc.) saved to IPFS
* Single Page Applications (HTML and JavaScript), deployed also to IPFS
* Signals - searching, offers, acceptance etc. saved to BCH blockchain. Used by the SPAs above to communicate with each other
* Non-fingable tokens (NFT) - used to indicate the agreement or membership - job hiring, offer acceptance etc. 

For the time of the hackatron all parts implementations will be in the current repository,
but because parts should be independent, the plans are to have independent repositories for every part, so they can be used separately.

## Used libraries and services

* [bch-js](https://github.com/Permissionless-Software-Foundation/bch-js) - all BCH related operations
* [bch-js-ext](https://github.com/zh/bch-js-ext) - working with NFT
* [FullStack.cash](https://fullstack.cash/) - REST API to BCH blockchain
* [SLPDB](https://slpdb.fountainhead.cash/explorer) - SLP-related queries
* [BitDB](http://bitdb.bch.sx/explorer) - BCH blockchain queries

## Work progress

The first week of the work on the project was dedicated for developing and implementing "Negotiation protocol" (*NegoProt*) - BCH transactions with a specific format, accepted by all parts, used for communication

See more information about the protocol specification and usage see the [NegoProt repository](./negoprot/README.md).

I will try to apply for the all three of the SLP foundation bountes, so the  next steps are implementing some real world applications scenarios, based on the protocol above, related the the bounties goals:

- Economic Freedom Bounty - Disptibuted job searching/applying or VIP fan club membership
- Techological Freedom Bounty - encrypted messaging
- Collaborative Freedom Bounty - AAA meeting; lawful peaceful protest information/member gatering

