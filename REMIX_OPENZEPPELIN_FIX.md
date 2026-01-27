# Fixing OpenZeppelin mcopy Error in Remix

## Problem
OpenZeppelin v5.4.0 uses `mcopy` opcode which Polygon doesn't support yet.

## Solution: Use OpenZeppelin v5.0.0 in Remix

### Option 1: Manual GitHub Import (Recommended)

In Remix, instead of using `@openzeppelin/contracts`, use GitHub imports with version tag:

**For GiveToken.sol, replace imports with:**
```solidity
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/utils/Nonces.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/utils/ReentrancyGuard.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/utils/Pausable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/access/AccessControl.sol";
```

**For GiveTokenGovernance.sol, replace imports with:**
```solidity
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/governance/Governor.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/governance/extensions/GovernorSettings.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/governance/extensions/GovernorCountingSimple.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/governance/extensions/GovernorVotes.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/governance/extensions/GovernorTimelockControl.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/governance/TimelockController.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/interfaces/IERC5805.sol";
```

### Option 2: Use Solidity 0.8.20 with OpenZeppelin v5.0.0

1. Change pragma to `^0.8.20` in both contracts
2. In Remix, select compiler **0.8.20**
3. Delete `remix_packages` folder if it exists
4. Remix should install OpenZeppelin v5.0.0 (compatible with 0.8.20)

### Option 3: Use Hardhat Locally

Deploy using Hardhat which uses the version specified in `package.json` (v5.0.0).
