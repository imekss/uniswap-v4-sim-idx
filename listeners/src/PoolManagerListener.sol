// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "sim-idx-sol/Simidx.sol";
import "sim-idx-generated/Generated.sol";


// Uniswap V4 PoolManager Listener

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


// contract PoolManagerListener is PoolManager$OnInitializeEvent , PoolManager$OnSwapEvent {

 contract PoolManagerListener is PoolManager$OnInitializeEvent , PoolManager$OnSwapEvent, PoolManager$OnModifyLiquidityEvent {
    event PoolInitialized(
        uint64 chainId,
        bytes32 txnHash,
        uint256 blockNumber,
        uint256 blockTimestamp, 
        bytes32 id,
        address currency0,
        address currency1,
        uint24 fee,
        int24 tickSpacing,
        address hooks,
        uint160 sqrtPriceX96,
        int24 tick
  
    );

    event PoolSwap(
        uint64 chainId,
        bytes32 txnHash,
        uint256 blockNumber,
        uint256 blockTimestamp,
        bytes32 id,
        address sender,
        int128 amount0,
        int128 amount1,
        uint160 sqrtPriceX96,
        uint128 liquidity,
        int24 tick,
        uint24 fee
    );

    event LiquidityModified(
        uint64 chainId,
        bytes32 txnHash,
        uint256 blockNumber,
        uint256 blockTimestamp,
        bytes32 id,
        address sender,
        int24 tickLower,
        int24 tickUpper,
        int256 liquidityDelta,
        bytes32 salt
    );


    function onInitializeEvent(
        EventContext memory ctx,
        PoolManager$InitializeEventParams memory inputs
    ) external override {
        emit PoolInitialized(
            uint64(block.chainid),
            ctx.txn.hash(),
            blockNumber(),
            block.timestamp,
            inputs.id,
            inputs.currency0,
            inputs.currency1,
            inputs.fee,
            inputs.tickSpacing,
            inputs.hooks,
            inputs.sqrtPriceX96,
            inputs.tick
        );
    }

    function onSwapEvent(
        EventContext memory ctx,
        PoolManager$SwapEventParams memory inputs
    ) external override {
        emit PoolSwap(
            uint64(block.chainid),
            ctx.txn.hash(),
            blockNumber(),
            block.timestamp,
            inputs.id,
            inputs.sender,
            inputs.amount0,
            inputs.amount1,
            inputs.sqrtPriceX96,
            inputs.liquidity,
            inputs.tick,
            inputs.fee
        );
    }

    function onModifyLiquidityEvent(
        EventContext memory ctx,
        PoolManager$ModifyLiquidityEventParams memory inputs
     ) external override {
        emit LiquidityModified(
            uint64(block.chainid),
            ctx.txn.hash(),
            blockNumber(),
            block.timestamp,
            inputs.id,
            inputs.sender,
            inputs.tickLower,
            inputs.tickUpper,
            inputs.liquidityDelta,
            inputs.salt
        );
    }

}