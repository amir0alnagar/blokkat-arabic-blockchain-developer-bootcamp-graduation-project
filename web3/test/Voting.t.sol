// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {Voting} from "../src/Voting.sol";
contract VotingTest is Test {
    Voting public voting;
    address owner  = makeAddr("owner");
    address voter1 = makeAddr("voter1");
    address voter2 = makeAddr("voter2");
    address voter3 = makeAddr("voter3");
    address voter4 = makeAddr("voter4");
    address voter5 = makeAddr("voter5");
    address voter6 = makeAddr("voter6");

    function setUp() public {
        vm.prank(owner);
        voting = new Voting(6, 2);
        vm.deal(owner,  1 ether);
        vm.deal(voter1, 1 ether);
        vm.deal(voter2, 1 ether);
        vm.deal(voter3, 1 ether);
        vm.deal(voter4, 1 ether);
        vm.deal(voter5, 1 ether);
        vm.deal(voter6, 1 ether);
    }

    function testCreateCandidate() public {
        vm.startPrank(owner);
        voting.createCandidate("Candidate1");
        voting.createCandidate("Candidate2");
        voting.createCandidate("Candidate3");
        voting.createCandidate("Candidate4");
        voting.createCandidate("Candidate5");
        vm.stopPrank();
    }

    function testDeposit() public {
        vm.prank(voter1);
        voting.deposit{value: 0.01 ether}();
        vm.prank(voter2);
        voting.deposit{value: 0.02 ether}();
        vm.prank(voter3);
        voting.deposit{value: 0.03 ether}();
        vm.prank(voter4);
        voting.deposit{value: 0.04 ether}();
        vm.prank(voter5);
        voting.deposit{value: 0.05 ether}();
        vm.prank(voter6);
        voting.deposit{value: 0.06 ether}();
        assertEq(voting.balances(voter1), 0.01 ether);
        assertEq(voting.balances(voter2), 0.02 ether);
        assertEq(voting.balances(voter3), 0.03 ether);
        assertEq(voting.balances(voter4), 0.04 ether);
        assertEq(voting.balances(voter5), 0.05 ether);
        assertEq(voting.balances(voter6), 0.06 ether);
    }

    function testVote() public {
        vm.startPrank(owner);
        voting.createCandidate("Candidate1");
        voting.createCandidate("Candidate2");
        voting.createCandidate("Candidate3");
        vm.stopPrank();

        vm.startPrank(voter1);
        voting.deposit{value: 0.01 ether}();
        voting.vote("Candidate1");
        vm.stopPrank();
        
        vm.startPrank(voter2);
        voting.deposit{value: 0.03 ether}();
        voting.vote("Candidate2");
        vm.stopPrank();
        
        vm.startPrank(voter3);
        voting.deposit{value: 0.02 ether}();
        voting.vote("Candidate3");
        vm.stopPrank();
        
        vm.startPrank(owner);
        voting.endVoting();
        vm.stopPrank();
        
        vm.startPrank(voter4);
        vm.expectRevert();
        voting.deposit{value: 0.01 ether}();
        vm.expectRevert();
        voting.vote("Candidate1");
        vm.stopPrank();

        assertEq(voting.votesPerCandidate("Candidate1"), 1);
        assertEq(voting.votesPerCandidate("Candidate2"), 3);
        assertEq(voting.votesPerCandidate("Candidate3"), 2);
    }

    function testDoubleVoteReverts() public {
    vm.startPrank(owner);
    voting.createCandidate("Candidate1");
    vm.stopPrank();

    vm.startPrank(voter1);
    voting.deposit{value: 0.05 ether}();
    voting.vote("Candidate1");

    vm.expectRevert("You have already voted");
    voting.vote("Candidate1");
    vm.stopPrank();
}

    function testResults() public {
    
    vm.startPrank(owner);
    voting.createCandidate("Candidate1");
    voting.createCandidate("Candidate2");
    voting.createCandidate("Candidate3");
    vm.stopPrank();

    vm.startPrank(voter1);
    voting.deposit{value: 0.01 ether}();
    voting.vote("Candidate1");
    vm.stopPrank();

    vm.startPrank(voter2);
    voting.deposit{value: 0.02 ether}();
    voting.vote("Candidate1");
    vm.stopPrank();

    vm.startPrank(voter3);
    voting.deposit{value: 0.05 ether}();
    voting.vote("Candidate1");
    vm.stopPrank();

    Voting.CandidatesVotes[] memory results = voting.getResults();
    assertEq(results[0].candidate, "Candidate1");
        }

    function testEndVoting() public {
        vm.prank(owner);
        voting.endVoting();
        vm.prank(voter1);
        vm.expectRevert();
        voting.endVoting();
    }

    function testWithdraw() public {
    vm.startPrank(owner);
    voting.createCandidate("Candidate1");
    voting.deposit{value: 0.03 ether}();
    voting.vote("Candidate1");
    vm.stopPrank();

    vm.startPrank(voter1);
    voting.deposit{value: 0.01 ether}();
    voting.vote("Candidate1");
    vm.stopPrank();

    vm.prank(owner);
    voting.endVoting();

    uint256 balanceBefore = voter1.balance;
    vm.prank(voter1);
    voting.withdraw();
    uint256 balanceAfter = voter1.balance;

    assertEq(voting.balances(voter1), 0);
    assertGt(balanceAfter, balanceBefore);
}

}
