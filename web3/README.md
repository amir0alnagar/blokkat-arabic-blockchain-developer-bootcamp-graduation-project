## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
-------------------------------------------------------------
-------------------------------------------------------------
🗳️ Voting Smart Contract

-------------------------------------------------------------
-------------------------------------------------------------
About the Project
-------------------
This project implements a decentralized Voting Smart Contract that allows users to deposit ETH to gain voting power, vote for candidates, and withdraw their deposited funds after the voting period ends.



Key features:
- Voters deposit ETH to gain voting power, capped at 5 votes.
- Each voter can vote only once.
- Voting is time-limited by a deadline.
- Only the contract owner can add candidates and end the voting.
- Voters can withdraw their ETH only after voting ends.
- Votes are weighted by the amount deposited (1 vote per 0.01 ETH, max 5 votes).

-------------------------------------------------------------
-------------------------------------------------------------
Directory Structure
---------------------
GRADUATION-PROJECT/
│
├── my-dapp/                      # Frontend React app
│   ├── config/                   # Configuration files (e.g., contract addresses, wagmi config)
│   ├── public/                   # Static public assets
│   ├── src/                      # React source code
│   │   ├── components/           # UI components and custom hooks
│   │   ├── pages/                # App pages like Home, Voting, Results, Withdraw
│   │   ├── App.jsx               # Main React component
│   │   └── main.jsx              # React entry point
│   ├── package.json              # Frontend dependencies and scripts
│   └── vite.config.js            # Vite bundler config
│
├── web3/                         # Smart contracts and testing
│   ├── src/                      # Solidity smart contracts
│   │   └── Voting.sol
│   ├── test/                     # Smart contract tests using Foundry
│   ├── script/                   # Deployment scripts
│   ├── foundry.toml              # Foundry config
│   └── remappings.txt            # Import remappings



-------------------------------------------------------------
-------------------------------------------------------------

✅ Design Patterns Used
-------------------------

### 1. Inheritance and Interfaces

* The contract inherits from OpenZeppelin’s `Ownable` to easily manage ownership.
* 📍 Location:

  ```solidity
  import "@openzeppelin/contracts/access/Ownable.sol";
  contract Voting is Ownable{
    // ....
  }
  ```

### 2. Access Control

* Only the owner can add candidates or end the voting using `onlyOwner` modifier.
* 📍 Functions:

  * `createCandidate`
  * `endVoting`

This ensures that only the owner can perform these actions, preventing unauthorized access by other users.

-------------------------------------------------------------
-------------------------------------------------------------


## 🔐 Security Best Practices
-------------------------

### 1. Using Specific Compiler Version

* The contract uses a **fixed** pragma version:

  ```solidity
  pragma solidity 0.8.20;
  ```

### 2. Proper Use of `require`

* `require` is used extensively to enforce rules:

  * Minimum deposit
  * Preventing double voting
  * Voting only during allowed time

### 3. Checks-Effects-Interactions Pattern 

* Proper order is maintained during withdrawals:

  ```solidity
  function withdraw() public {
      require(isPaused, "Voting is not over yet");       
      uint256 amount = balances[msg.sender];             
      balances[msg.sender] = 0;                           
      (bool sent, ) = msg.sender.call{value: amount}("");
      require(sent, "Failed to send Ether");
  }
  ```


### 4. 🛡️ DAO Exploit Prevention

This contract avoids **DAO-style reentrancy vulnerabilities** through:

1. ✅ Using **pull-based withdrawals**:

   * Users must manually withdraw their balance (instead of the contract pushing funds to them automatically).
   * 📍 Function: `withdraw()`

2. ✅ Using **Checks-Effects-Interactions** pattern in `withdraw()`

3. ✅ Restricting who can add candidates:

   * Only `owner` can call `createCandidate()`
   * Candidate names are unique and limited
   * 📍 Function: `createCandidate()`
-------------------------------------------------------------
-------------------------------------------------------------
🔗 Important Links & Addresses
----------------------------------------------------

Contract Addresses on Scroll Sepolia Testnet
Voting Contract Address: {0xYourContractAddressHere}

Verified Contract on Scroll Sepolia Explorer
{Verified Voting Contract on Scroll Sepolia}
Frontend DApp Hosted Link
{Voting DApp Frontend}
-------------------------------------------------------------
-------------------------------------------------------------
🧪 How to Run Tests
-----------------------------------

To test the smart contract, follow these steps:

1. Open a terminal and navigate to the web3/ directory:
cd web3

2. Run the tests using Foundry's testing framework with this command:
forge test

This command will compile the contracts and run all the unit tests located in web3/test/.


-------------------------------------------------------------
-------------------------------------------------------------
▶️ How to Run the Program
-----------------------------------
1. Running the Smart Contracts
Prerequisites:

  - Install Foundry for compiling, testing, and deploying contracts.
  
  - Have an Ethereum wallet and some testnet ETH on Scroll Sepolia testnet.

- Compile contracts:
forge build

- Run tests:

From the web3 directory, run:
forge test


- Deploy the contract:

Use the deployment script (example using Foundry script):
forge script script/Voting.s.sol --rpc-url <RPC_URL> --private-key <PRIVATE_KEY> --broadcast

* Replace <RPC_URL> with your Scroll Sepolia RPC endpoint and <PRIVATE_KEY> with your deployer wallet’s private key.

------------------------------------
2. Running the Frontend

- Navigate to the frontend directory:
cd my-dapp

- Install dependencies:
npm install

- Set up environment variables:

Create a .env file in the root of my-dapp with the following variables:
VITE_CONTRACT_ADDRESS=<Your_Deployed_Contract_Address>
VITE_RPC_URL=<Scroll_Sepolia_RPC_URL>

- Start the frontend app locally:
npm run dev

- Open your browser at the displayed localhost address (usually http://localhost:5173) to interact with the DApp.

-------------------------------------------------------------
-------------------------------------------------------------

🎬 Demo
---------------
To demonstrate how the Voting DApp works, here is a walkthrough showing the full user interaction from the frontend to the smart contract on the Scroll Sepolia testnet:

1. Access the DApp Frontend:
Open the hosted frontend application at:
https://your-dapp-frontend-url.com

2. Connect Your Wallet:
Connect your Ethereum wallet (e.g., MetaMask) to the Scroll Sepolia testnet network.

3. Deposit Ether:
Deposit a minimum of 0.01 ETH to gain voting power. The deposited amount influences the weight of your vote (up to a maximum voting power of 5).

4. Vote for a Candidate:
Choose one of the listed candidates and submit your vote. The transaction will be sent to the Voting smart contract on Scroll Sepolia.

5. Check Transaction on Explorer:
View the transaction on Scroll Sepolia explorer:
https://sepolia.scrollscan.com/tx/your-transaction-hash

6. View Results:
After voting, navigate to the Results page to see the current vote counts for each candidate updated in real-time.

7. Withdraw Your Deposit:
After voting ends and the contract is paused, withdraw your deposited Ether from the contract back to your wallet.

-----------------------------------------
Video Walkthrough
Here is a recorded video demonstrating the full process:



