# 🦄 Uniswap v4 Indexer (Dune SIM IDX)

This project uses [Dune SIM IDX](https://docs.sim.dune.com/idx) to **index Uniswap v4 PoolManager events** directly in Solidity, 
and expose APIs for hook adoption and usage analytics.

## 📖 Concepts

Uniswap v4 introduces **Hooks**, external smart contracts that extend the behavior of liquidity pools.  
- Every **pool can have exactly one hook**.  
- A **hook contract** can serve many pools, intercepting actions like `swap`, `mint`, or `burn`.  
- Hooks are chosen at **pool initialization** and are part of the pool’s unique key (`currency0, currency1, fee, tickSpacing, hooks`).  
- If `hooks = 0x000…000`, the pool is **hookless**.

Reference:  
<!-- ![Uniswap v4 Hooks](./docs/hooks.png)   -->

Comparison across versions:  
<table>
  <thead>
    <tr>
      <th>Version</th>
      <th>Contract</th>
      <th>Event</th>
      <th>Pool Identifier</th>
      <th><code>token0</code> / <code>token1</code> Fields</th>
      <th>Fee</th>
      <th>Hooks</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b style="color:#ff007a;">v2</b></td>
      <td><a href="#">Factory</a></td>
      <td><code>PairCreated</code></td>
      <td><code>pair</code></td>
      <td><code>token0</code>, <code>token1</code></td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
    <tr>
      <td><b style="color:#ff007a;">v3</b></td>
      <td><a href="#">UniswapV3Factory</a></td>
      <td><code>PoolCreated</code></td>
      <td><code>pool</code></td>
      <td><code>token0</code>, <code>token1</code></td>
      <td><code>fee</code></td>
      <td>N/A</td>
    </tr>
    <tr>
      <td><b style="color:#ff007a;">v4</b></td>
      <td><a href="#">PoolManager</a></td>
      <td><code>Initialize</code></td>
      <td><code>id</code></td>
      <td><code>currency0</code>, <code>currency1</code></td>
      <td><code>fee</code></td>
      <td><code>hooks</code></td>
    </tr>
  </tbody>
</table>


## What it does
- Indexes **pool initialization** (which tokens, fee tier, tick spacing, and hook address).
- Indexes **pool swaps** (amounts, price movement, liquidity, tick).
- Exposes API endpoints for:
  - **Hook adoption** – which hooks are being used, and when they were first seen.
  - **Pools by hook** – list pools initialized with a given hook.
  - **Hook usage over time** – daily swap activity per hook.

Built with [Dune SIM IDX](https://docs.sim.dune.com/idx), a framework that helps you index blockchain data in minutes by defining listeners that react to onchain events, extract relevant data, and automatically make it queryable via an API, with the option to extend your indexer using custom **Solidity** code to capture advanced onchain logic directly from smart contracts .


## Exposed API
We expose the following API: `/hooks-adoptions?hook=0x000052423c1db6b7ff8641b85a7eefc7b2791888`
This will then output a list of the in-range LPs:

```json
{
  "hook": "0x000052423c1db6b7ff8641b85a7eefc7b2791888",
  "poolsCount": "90",
  "firstSeenBlock": "19141943",
  "firstSeenTs": "1749759695"
}
```

## Indexing Methodology

_Details coming soon._

## Querying Methodology
The `/hook-adoptions` endpoint query the table poolInitialized table in our Database, and aggregated the hooks by the number of pools.




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