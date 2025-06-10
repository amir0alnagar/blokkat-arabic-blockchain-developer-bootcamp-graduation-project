# 🗳️ Voting Smart Contract

---

## About the Project

This project implements a decentralized Voting Smart Contract that allows users to deposit ETH to gain voting power, vote for candidates, and withdraw their deposited funds after the voting period ends.

**Key features:**

- Voters deposit ETH to gain voting power, capped at 5 votes.
- Each voter can vote only once.
- Voting is time-limited by a deadline.
- Only the contract owner can add candidates and end the voting.
- Voters can withdraw their ETH only after voting ends.
- Votes are weighted by the amount deposited (1 vote per 0.01 ETH, max 5 votes).

---

## Directory Structure

```

GRADUATION-PROJECT/
│
├── my-dapp/                      # Frontend React app
│   ├── config/                   # Configuration files (contract addresses, wagmi config)
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

````

---

## ✅ Design Patterns Used

### 1. Inheritance and Interfaces

- The contract inherits from OpenZeppelin’s `Ownable` to easily manage ownership.

```solidity
import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable {
    // Contract code
}
````

### 2. Access Control

* Only the owner can add candidates and end the voting using the `onlyOwner` modifier.

Protected functions:

* `createCandidate`
* `endVoting`

---

## 🔐 Security Best Practices

### 1. Using Specific Compiler Version

* The contract uses a fixed Solidity compiler version:

```solidity
pragma solidity 0.8.20;
```

### 2. Proper Use of `require`

* `require` statements enforce important rules:

  * Minimum deposit amount
  * Prevent double voting
  * Allow voting only within the allowed time frame

### 3. Checks-Effects-Interactions Pattern

* The `withdraw()` function follows the Checks-Effects-Interactions pattern:

```solidity
function withdraw() public {
    require(isPaused, "Voting is not over yet");
    uint256 amount = balances[msg.sender];
    balances[msg.sender] = 0;
    (bool sent, ) = msg.sender.call{value: amount}("");
    require(sent, "Failed to send Ether");
}
```

### 4. DAO Exploit Prevention

* Prevents reentrancy attacks by:

  * Using pull-based withdrawals (`withdraw()`).
  * Applying the Checks-Effects-Interactions pattern.
  * Restricting candidate addition to the owner only.
  * Ensuring unique candidate names.

---

## 🔗 Important Links & Addresses

* **Voting Contract Address (Scroll Sepolia Testnet):**
  `0xA2DeBc0969700F72702A7D4ADEAF48d4B26fe827`

* **Frontend DApp Hosted Link:**
  `https://blokkat-blockvote.netlify.app/`

***********************************************************************************************************************
owner public key= 0x808c6De82121a81fF1E8Ff207730Ef68a8e31006
owner private key= 0x968ba1b3dc0f6b32d4541b15e58737114165af3ae22551fed12e17083cb873c6
this private key for the project . Please do not use it for any other project.
i write it here to able you to use the contract as a owner
***********************************************************************************************************************
---

## 🧪 How to Run Tests

1. Open a terminal and navigate to the smart contract folder:

```bash
cd web3
```

2. Run tests using Foundry:

```bash
forge test
```

---

## ▶️ How to Run the Program

### 1. Running the Smart Contracts

* Install Foundry.

* Have an Ethereum wallet with testnet ETH on Scroll Sepolia.

* Build contracts:

```bash
forge build
```

* Run tests:

```bash
forge test
```

* Deploy contract:

```bash
forge script script/Voting.s.sol --rpc-url <RPC_URL> --private-key <PRIVATE_KEY> --broadcast
```

Replace `<RPC_URL>` with your Scroll Sepolia RPC endpoint and `<PRIVATE_KEY>` with your deployer wallet’s private key.

---

### 2. Running the Frontend

* Navigate to the frontend directory:

```bash
cd my-dapp
```

* Install dependencies:

```bash
npm install
```

* Create a `.env` file with:

```
VITE_CONTRACT_ADDRESS=<Your_Deployed_Contract_Address>
VITE_RPC_URL=<Scroll_Sepolia_RPC_URL>
```

* Run the frontend app locally:

```bash
npm run dev
```

* Open your browser at the displayed localhost address (usually `http://localhost:5173`).

---

## 🎬 Demo

To demonstrate how the Voting DApp works:

1. Open the hosted frontend app:
   `https://your-dapp-frontend-url.com`

2. Connect your Ethereum wallet (e.g., MetaMask) to the Scroll Sepolia network.

3. Deposit a minimum of 0.01 ETH to gain voting power.

4. Vote for a candidate.

5. Check the transaction on Scroll Sepolia explorer:
   `https://sepolia.scrollscan.com/tx/your-transaction-hash`

6. View the current vote counts on the Results page.

7. After voting ends, withdraw your deposited ETH.

---

🎥 **Video Walkthrough:**
[Link to Demo Video](https://drive.google.com/file/d/1f4ov7-ME6nDl67YbOWdfp5MCazIKIqjK/view?usp=drive_link)

---