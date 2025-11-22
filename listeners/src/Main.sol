// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "sim-idx-sol/Simidx.sol";
import "sim-idx-generated/Generated.sol";

import "./Constants.sol";

import "./PoolManagerListener.sol";
contract Triggers is BaseTriggers {
    function triggers() external virtual override {
        PoolManagerListener listener = new PoolManagerListener();

        // ETHEREUMM
        addTrigger(chainContract(Chains.Ethereum, POOLMANAGER_ETHEREUM),listener.triggerOnInitializeEvent());
        addTrigger(chainContract(Chains.Ethereum, POOLMANAGER_ETHEREUM),listener.triggerOnSwapEvent());

        // UNICHAIN
        addTrigger(chainContract(Chains.Unichain, POOLMANAGER_UNICHAIN),listener.triggerOnInitializeEvent());
        addTrigger(chainContract(Chains.Unichain, POOLMANAGER_UNICHAIN),listener.triggerOnSwapEvent());


        // OPTIMISM
        addTrigger(chainContract(Chains.Optimism, POOLMANAGER_OPTIMISM),listener.triggerOnInitializeEvent());
        addTrigger(chainContract(Chains.Optimism, POOLMANAGER_OPTIMISM),listener.triggerOnSwapEvent());


        // BASE
        addTrigger(chainContract(Chains.Base, POOLMANAGER_BASE),listener.triggerOnInitializeEvent());
        addTrigger(chainContract(Chains.Base, POOLMANAGER_BASE),listener.triggerOnSwapEvent());


        // ARBITRUM
        addTrigger(chainContract(Chains.Arbitrum, POOLMANAGER_ARBITRUM),listener.triggerOnInitializeEvent());
        addTrigger(chainContract(Chains.Arbitrum, POOLMANAGER_ARBITRUM),listener.triggerOnSwapEvent());


        // // POLYGON
        // addTrigger(chainContract(Chains., POOLMANAGER_POLYGON),listener.triggerOnInitializeEvent());
        // addTrigger(chainContract(Chains.Polygon, POOLMANAGER_POLYGON),listener.triggerOnSwapEvent());   


        // // BLAST
        // addTrigger(chainContract(Chains., POOLMANAGER_BLAST),listener.triggerOnInitializeEvent());
        // addTrigger(chainContract(Chains.Blast, POOLMANAGER_BLAST),listener.triggerOnSwapEvent());   


        // ZORA 
        addTrigger(chainContract(Chains.Zora, POOLMANAGER_ZORA),listener.triggerOnInitializeEvent());
        addTrigger(chainContract(Chains.Zora, POOLMANAGER_ZORA),listener.triggerOnSwapEvent());


        // // WORLDCOIN
        // addTrigger(chainContract(Chains.Worldcoin, POOLMANAGER_WORLDCOIN),listener.triggerOnInitializeEvent());
        // addTrigger(chainContract(Chains.Worldcoin, POOLMANAGER_WORLDCOIN),listener.triggerOnSwapEvent());


        // INK
        addTrigger(chainContract(Chains.Ink, POOLMANAGER_INK),listener.triggerOnInitializeEvent());
        addTrigger(chainContract(Chains.Ink, POOLMANAGER_INK),listener.triggerOnSwapEvent());


        // SONEIUM
        addTrigger(chainContract(Chains.Soneium, POOLMANAGER_SONEIUM),listener.triggerOnInitializeEvent());
        addTrigger(chainContract(Chains.Soneium, POOLMANAGER_SONEIUM),listener.triggerOnSwapEvent());


        // // AVALANCHE
        // addTrigger(chainContract(Chains.Avalanche, POOLMANAGER_AVALANCHE),listener.triggerOnInitializeEvent());
        // addTrigger(chainContract(Chains.Avalanche, POOLMANAGER_AVALANCHE),listener.triggerOnSwapEvent());


        // // BNB
        // addTrigger(chainContract(Chains.BNB, POOLMANAGER_BNB),listener.triggerOnInitializeEvent());
        // addTrigger(chainContract(Chains.BNB, POOLMANAGER_BNB),listener.triggerOnSwapEvent());


        // // CELO
        // addTrigger(chainContract(Chains.Celo, POOLMANAGER_CELO),listener.triggerOnInitializeEvent());
        // addTrigger(chainContract(Chains.Celo, POOLMANAGER_CELO),listener.triggerOnSwapEvent());
    }
}