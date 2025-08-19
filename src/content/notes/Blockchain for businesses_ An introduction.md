---
title: "Blockchain for business"
updated: 2025-06-13 08:52:13Z
created: 2021-06-11 10:51:00Z
latitude: 35.89547060
longitude: 14.46650720
altitude: 0.0000
---

==A blockchain is a decentralized, distributed, and oftentimes public, digital ledger that is used to record transactions across many computers so that any involved record cannot be altered retroactively, without== the alteration of all subsequent blocks.

[Various protocols](https://cryptomaniaks.com/blockchain-protocols-list-explained) (or consensus algorithms) emerged to describe how transactions within the network should be validated, which gave rise to different blockchain implementations.

## Smart contracts

A smart contract is a computer protocol intended to digitally facilitate, verify, or enforce the negotiation or performance of digital currencies i.e. tokens, or assets between parties under certain conditions. These contracts are stored on blockchain technology.

The ERC-20 protocol is the technical standard used for all smart contracts on the Ethereum blockchain for token implementation. Thus, tokens are built by following a standard template and are hosted on existing blockchains, while coins are unique digital currencies which are based on their own, standalone blockchains. ==Most tokens exist to be used with DApps (decentralized applications). Ropsten is the most popular public testnet for Ethereum and is often used as a testing network for developers creating their own dApps on the Ethereum blockchain.==

**Chaincode** is the equivalent of a smart contract in Hyperledger Fabric and is written in Golang, Node.js or Java. Hyperledger Fabric uses a different consensus algorithm than Bitcoin's proof-of-work (PoW) which allows it to operate at a much faster transaction rate.

AWS Blockchain Templates enable you to focus on building your blockchain applications instead of spending time and energy on manual setup of your blockchain network. ==The AWS Blockchain Template for Hyperledger Fabric only supports a docker-local container platform, meaning the Hyperledger Fabric containers are deployed on a single EC2 instance.==

## Initial Coin Offering

Starting in 2017, some startups began to opt for an ICO as a quick and easy way to raise funds. In short, the user would pay for a token upfront, providing funds for coders to develop the promised technology. If the technology works as advertised and gains popularity, it should attract more users, thus increasing demand for the token offered at the start. As the token value increases, those early users who bought tokens will benefit from appreciating token prices.

The lack of regulation has made ICOs a popular way of scamming unwary investors. An IEO is functionally the same as an ICO, differing only operationally; funds are raised through a crypto exchange (the "e" in IEO) that acts as an intermediary between the project's developers and investors. This means an IEO is subject to independent evaluation, KYC and AML rules are applied, and investors are afforded greater security and project transparency.

## The Maltese legal framework

In Malta, blockchain-related legislation was passed through Parliament on July 4, 2018 and entered into effect close to a year later, on March 17, 2019:

### Malta Digital Innovation Authority (MDIA) Act

This was responsible for the creation of a body in charge of regulating Blockchain (distributed ledger technologies) and AI.

### Virtual Financial Assets (VFA) Act

This obliges prospective ICO issuers to apply for a license with MFSA through a VFA agent who will ensure everything is according to the law.

### Innovative Technology Arrangements and Services Act (ITAS) Act

This allows MDIA to certify the qualities, features, attributes, behaviours, or aspects of a particular arrangement as fit for a particular purpose/s.

## Private blockchains

A private blockchain is a blockchain with an access control layer built into the protocol. In practice, this means network participants have control over who can join the network, and who can participate in the consensus process of the blockchain.

At the enterprise level, the main benefit of this class of distributed ledgers rests in its ability to do away with reconciliation of data among participating entities. Currently, a significant portion of the back-office work at financial institutions is being spent on the reconciliation of records, which is why they have been increasingly investing in this technology.

There is considerable debate in the community with regards to the value of a private blockchain over a shared database. Some, like Prof. Arvind Narayanan of Stanford, [contend]() that private blockchains are just another name for a shared database. Others, like Gideon Greenspan of Multichain see [several differences]() between private blockchain and SQL-like databases, from disintermediation to robustness.

Ultimately, private blockchains provide higher levels of error checking and transaction validity than regular shared databases. That's because, even though they don’t use proof of work, blocks of transactions are validated using some other form of consensus mechanism. One such algorithm is Juno which improves the security features of the blockchain by protecting against insular hacking cases, thus preventing individual participants from acting in a malicious manner.

## Is blockchain the right choice?

_It depends._

Blockchain should never be viewed as an end in itself but rather as a means to an end. Regular users don't care about the underlying technology as long as they're satisfied with the service.

Advice from Nicholas Mamo:

> Opt for a wallet and query from a transaction history created for each user. Alternative option is to create the transaction asset within the user's wallet but that is a more difficult approach. Update the wallet as needed without creating a currency. Ask drivers for their IBAN account to receive funds from the company's own bank account. Hyperledger Fabric has poor documentation. Composer makes it very easy to link assets to a user.
