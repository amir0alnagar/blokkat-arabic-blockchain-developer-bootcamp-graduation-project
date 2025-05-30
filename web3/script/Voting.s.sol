// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {Voting} from "../src/Voting.sol";

contract CounterScript is Script {
    Voting public voting;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        voting = new Voting(6, 2);

        vm.stopBroadcast();
    }
}
