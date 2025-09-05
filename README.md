# 🦄 Uniswap v4 Hooks Indexer (Dune SIM IDX)

This project uses [Dune SIM IDX](https://docs.sim.dune.com/idx) to **index Uniswap v4 PoolManager events** directly in Solidity, 
and expose APIs for hook adoption and usage analytics.

## What it does
- Indexes **pool initialization** (which tokens, fee tier, tick spacing, and hook address).
- Indexes **pool swaps** (amounts, price movement, liquidity, tick).
- Exposes API endpoints for:
  - **Hook adoption** – which hooks are being used, and when they were first seen.
  - **Pools by hook** – list pools initialized with a given hook.
  - **Hook usage over time** – daily swap activity per hook.
  - **Pool activity samples** – latest swaps or inits (for dashboards/testing).

Built with [Dune SIM IDX](https://docs.sim.dune.com/idx), a framework that helps you index blockchain data in minutes by defining listeners that react to onchain events, extract relevant data, and automatically make it queryable via an API, with the option to extend your indexer using custom **Solidity** code to capture advanced onchain logic directly from smart contracts .

## Why it matters
Uniswap v4 introduces **hooks** (custom contracts that extend pool behavior).  
Tracking adoption and usage of hooks is critical for:
- Understanding ecosystem experiments (e.g. dynamic fees, custom AMMs).
- Measuring adoption across chains (Ethereum, Base, Unichain, …).
- Providing a foundation for more advanced analytics (TVL, fee revenue, LP activity).


## Exposed API
_Details coming soon._

## Indexing Methodology

_Details coming soon._

## Querying Methodology

_Details coming soon._


## SIM IDX: Quickstart Resources

Ready to start building? Check out our comprehensive guides:

- **[Deploying Your App](https://docs.sim.dune.com/idx/deployment)** - Deploy your app
- **[Adding ABIs](https://docs.sim.dune.com/idx/cli#sim-abi)** - How to add contract ABIs
- **[Writing Listeners](https://docs.sim.dune.com/idx/listener)** - Define your indexing logic
- **[CLI Reference](https://docs.sim.dune.com/idx/cli)** - All available commands
