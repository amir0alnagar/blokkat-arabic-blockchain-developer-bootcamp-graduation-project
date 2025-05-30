const wagmiContractConfig = {
  address: "0x4233646A5a504aa24A3E7aff263D3245f6e65B70",
  abi: [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_totalCandidates",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_deadline",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "string",
          name: "candidate",
          type: "string",
        },
      ],
      name: "NewCandidate",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [],
      name: "Pause",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [],
      name: "Unpause",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "voter",
          type: "address",
        },
        {
          indexed: true,
          internalType: "string",
          name: "candidate",
          type: "string",
        },
      ],
      name: "Vote",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Withdraw",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "balances",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      name: "candidateExists",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "candidateNames",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
      ],
      name: "createCandidate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "deposit",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "endVoting",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getCandidates",
      outputs: [
        {
          internalType: "string[]",
          name: "",
          type: "string[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getResults",
      outputs: [
        {
          components: [
            {
              internalType: "string",
              name: "candidate",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "votes",
              type: "uint256",
            },
          ],
          internalType: "struct Voting.CandidatesVotes[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "hasVoted",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "timeLeft",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalCandidates",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
      ],
      name: "vote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "votePower",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      name: "votesPerCandidate",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};

export default wagmiContractConfig;