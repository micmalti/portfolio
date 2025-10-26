---
title: 'Lightning 101: Node profitability'
updated: 2025-07-27 18:57:30Z
created: 2021-08-18 15:49:00Z
latitude: 35.86036400
longitude: 14.55678760
altitude: 0.0000
tags:
  - crypto
---

*This note is based on a [Twitter Spaces discussion](https://www.youtube.com/watch?v=LRZy-VtCPe4) hosted by the Lightning Labs team with members of the Plebnet community.*

There is the expectation that you can make sats right from the beginning, but you should understand that this is certainly not the case. In fact, it's the exact opposite: it is difficult to run a profitable routing.

Firstly, there is an element of random chance involved (you don't know when you'll get a route, for instance) and some competition as people are trying to get the same routes that you're trying to get. The part which makes it fun is that your decisions impact your success.

You should aim at generating a yield of 2%.

## Channel management

Since the network changes on a daily basis, channel management constantly requires human intervention. According to the speakers, an autonomous script simply won't be good enough to find the optimum balance between the rebalancing cost and the channel fee, and which connections are going to provide the most volume per amount of sats.

Be extremely mindful of on-chain fees, on-channel fees (loop-outs), opening and closing channel fees, and liquidity fees, because they add very fast and impact the profitability of the node over a long period of time.

## Liquidity

The **mempool** is where all the valid transactions wait to be confirmed by the Bitcoin network. A high mempool size indicates more network traffic which will result in longer average confirmation time and higher priority fees. A mempool of 80 sat/vB is considered to be high. Currently, it is 4 sat/vB.

## Rebalancing 

With rebalancing, it's very easy to get into trouble. In order to make sats, you need a payment flow. However, each time a payment flows through a channel, that channel becomes out of balance. As hinted earlier, the currently available tools for executing a rebalancing are still being improved and cannot be relied upon at all times. Such tools include RTL and Balance of Satoshis. 

There are different schools of thought with regards to rebalancing. Some believe that a channel needs to be perfectly balanced but this ends up raising the fees incurred which may result in a loss of profitability. Others think that an agressive fee readjustment, rather than active rebalancing, is a better strategy which leaves the rebalancing to the flows. Some do both. 

Static fees work for some node operators too. If there is a situation where you'll have so much flow that your inbound liquidity will soon be depleted, you can introduce a mechanism which raises the fees to 1.5x or 2x.

Loop is a service that makes it easier to send and receive funds on Lightning, serving as an on and off ramp between the Lightning Network and the Bitcoin blockchain. Liquidity trading, which could be expressed by Loop, by buying channnels or by doing circular rebalancing, is taking a life of its own. Lightning Labs' Lightning Pool provides a market where Lightning Network users can lease liquidity for payment channels. At the moment, buying inbound liquidity is not worth it.

## Opening channels

Opening a channel is similar to a stock pick. Think of it as an investment since there are opening and closing fees involved. See [here](https://terminal.lightning.engineering/) for a list of the top performing nodes.

It is better to have a few large channels rather than plenty of smaller-sized channels; a 20K sat channel is considered to be small. Opening big channels to some of the largest nodes will help a lot with flow. [Gridflare](https://gridflare.xyz/) and [SparkSeer](https://sparkseer.space/) are some of the tools which can help you choose those nodes that improve your centrality.

## Getting started

When you have outbound capacity, you can dispose of it through Plebnet, Ring of Fire, custodial wallets, or lightning swaps. You can also do a BoS dual-funded channel. To get started, reach out to [Plebnet](https://plebnet.wiki/wiki/Main_Page) users to open inbound channels with you.

There are spinoff Plebnet groups on Telegram:
- Plebnet Node Runners: This group is a little smaller and focused on those who have gotten their node up and running and have a few channels, aka have made the steps beyond the initial setting up a node, and are ready to talk a little more serious about node running. If you think you are ready, ping @AEHW1 to add you over to this group.
- Plebnet Advanced: This group is specifically focused on development of the network and tools for routing and network optimisation.


