// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable {
    mapping(address => uint256) public balances;
    mapping(address => bool) public hasVoted;
    mapping(string => uint256) public votesPerCandidate; 
    mapping(string => bool) public candidateExists;

    event Vote(address indexed voter, string indexed candidate);
    event NewCandidate(string indexed candidate);
    event Withdraw(address indexed from, uint256 value);
    event Pause(); 
    event Unpause();

    string[] public candidateNames;
    uint256 public totalCandidates;
    bool isPaused;
    uint256 deadline;

    struct CandidatesVotes {
        string candidate;
        uint256 votes;
    }

    constructor(uint256 _totalCandidates, uint256 _deadline) Ownable(msg.sender) {
        totalCandidates = _totalCandidates;
        deadline = block.timestamp + (_deadline * 1 days);
    }

    modifier votingIsAvailable() {
        if (block.timestamp > deadline) {
            isPaused = true;
            emit Pause();
        }
        require(!isPaused, "Contract is paused");
        _;
    }

    function createCandidate(string memory _name) public votingIsAvailable onlyOwner {
        require(candidateNames.length < totalCandidates, "Max Candidates reached");
        require(!candidateExists[_name], "Candidate already exists");
        votesPerCandidate[_name] = 0;
        candidateNames.push(_name);
        candidateExists[_name] = true;
        emit NewCandidate(_name);
    }

    function deposit() public payable votingIsAvailable {
        require(msg.value >= 0.01 ether, "Minimum deposit is 0.01 ether");
        // require(!hasVoted[msg.sender], "You have already voted");
        balances[msg.sender] += msg.value;
    }

    function votePower() public view returns (uint256) {
        uint256 power = balances[msg.sender] / 0.01 ether;
        return power <= 5 ? power : 5;
    }

    function vote(string memory _name) public votingIsAvailable {
        require(!hasVoted[msg.sender], "You have already voted");
        require(candidateExists[_name], "Candidate does not exist");

        uint256 power = votePower();
        votesPerCandidate[_name] += power;
        hasVoted[msg.sender] = true;
        emit Vote(msg.sender, _name);
    }

    function getCandidates() public view returns (string[] memory) {
        return candidateNames;
    }

    function getResults() public view returns (CandidatesVotes[] memory) {
        CandidatesVotes[] memory results = new CandidatesVotes[](candidateNames.length);
        for (uint256 i = 0; i < results.length; i++) {
            results[i] = CandidatesVotes({
                candidate: candidateNames[i],
                votes: votesPerCandidate[candidateNames[i]]
            });
        }
        return results;
    }

    function timeLeft() public view returns (uint256) {
        if (block.timestamp >= deadline) return 0;
        return deadline - block.timestamp;
    }

    function endVoting() public onlyOwner {
        isPaused = true;
        emit Pause();
    }

    function withdraw() public  {
        require(isPaused, "Voting is not over yet");
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
        emit Withdraw(msg.sender, amount);
    }
}
