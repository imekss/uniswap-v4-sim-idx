# 🦄 Uniswap v4 Indexer (Dune SIM IDX)


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




## ASCII Tribute to Uniswap v4
```text
//  4
//   44
//     444
//       444                   4444
//        4444            4444     4444
//          4444          4444444    4444                           4
//            4444        44444444     4444                         4
//             44444       4444444       4444444444444444       444444
//           4   44444     44444444       444444444444444444444    4444
//            4    44444    4444444         4444444444444444444444  44444
//             4     444444  4444444         44444444444444444444444 44  4
//              44     44444   444444          444444444444444444444 4     4
//               44      44444   44444           4444444444444444444 4 44
//                44       4444     44             444444444444444     444
//                444     4444                        4444444
//               4444444444444                     44                      4
//              44444444444                        444444     444444444    44
//             444444           4444               4444     4444444444      44
//             4444           44    44              4      44444444444
//            44444          444444444                   444444444444    4444
//            44444          44444444                  4444  44444444    444444
//            44444                                  4444   444444444    44444444
//           44444                                 4444     44444444    4444444444
//          44444                                4444      444444444   444444444444
//         44444                               4444        44444444    444444444444
//       4444444                             4444          44444444         4444444
//      4444444                            44444          44444444          4444444
//     44444444                           44444444444444444444444444444        4444
//   4444444444                           44444444444444444444444444444         444
//  444444444444                         444444444444444444444444444444   444   444
//  44444444444444                                      444444444         44444
// 44444  44444444444         444                       44444444         444444
// 44444  4444444444      4444444444      444444        44444444    444444444444
//  444444444444444      4444  444444    4444444       44444444     444444444444
//  444444444444444     444    444444     444444       44444444      44444444444
//   4444444444444     4444   444444        4444                      4444444444
//    444444444444      4     44444         4444                       444444444
//     44444444444           444444         444                        44444444
//      44444444            444444         4444                         4444444
//                          44444          444                          44444
//                          44444         444      4                    4444
//                          44444        444      44                   444
//                          44444       444      4444
//                           444444  44444        444
//                             444444444           444
//                                                  44444   444
//                                                      444