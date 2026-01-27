// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @notice POLYGON NETWORK CONFIGURATION
 * @notice Network: Polygon Mainnet (PoS)
 * @notice Chain ID: 137
 * @notice Native Currency: MATIC
 * @notice Block Explorer: https://polygonscan.com
 * @notice RPC: https://polygon-rpc.com
 * @notice 
 * @notice This contract is optimized for Polygon's low gas fees and fast block times.
 * @notice All transactions use MATIC as the native currency.
 * @notice Uses OpenZeppelin v5.0.0 (compatible with Polygon, no mcopy opcode)
 */

// Using GitHub imports for Remix compatibility (OpenZeppelin v5.0.0 - no mcopy opcode)
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/utils/Nonces.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/utils/ReentrancyGuard.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/utils/Pausable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/access/AccessControl.sol";

/**
 * @title GiveToken (GIVE) - Enhanced Version for Polygon Network
 * @dev ERC20 Token for charitable giving with advanced ICO functionality
 * Deployed on Polygon (MATIC) Network - Chain ID: 137
 * Fixed supply of 1 billion tokens with deflationary burn mechanism
 * Enhanced security with role-based access control and pause functionality
 * Optimized for Polygon's low gas fees and fast transactions
 * 
 * Network: Polygon Mainnet
 * Native Currency: MATIC
 * Block Explorer: https://polygonscan.com
 */
contract GiveToken is ERC20, ERC20Burnable, ERC20Permit, ERC20Votes, Ownable, ReentrancyGuard, Pausable, AccessControl {
    
    // Token Details
    uint256 public constant TOTAL_SUPPLY = 1_000_000_000 * 10**18; // 1 billion tokens
    uint256 public constant ICO_SUPPLY = 350_000_000 * 10**18;     // 35% for ICO (includes marketing & liquidity allocation)
    uint256 public constant CHARITY_SUPPLY = 350_000_000 * 10**18; // 35% for charity
    uint256 public constant TEAM_SUPPLY = 150_000_000 * 10**18;    // 15% for team
    uint256 public constant COMMUNITY_SUPPLY = 150_000_000 * 10**18; // 15% for community
    
    // ICO Variables (Polygon Network - MATIC)
    uint256 public icoPrice = 0.0001 ether; // Price per token in MATIC (100000000000000 wei)
    uint256 public icoTokensSold = 0;
    uint256 public icoStartTime;
    uint256 public icoEndTime;
    bool public icoActive = false;
    
    // Purchase limits (in MATIC - Polygon native currency)
    uint256 public minPurchase = 0.01 ether;  // Minimum purchase: 0.01 MATIC
    uint256 public maxPurchase = 5 ether;     // Maximum purchase: 5 MATIC
    
    // Wallets
    address public charityWallet;
    address public teamWallet;
    address public communityWallet;
    
    // Access Control Roles
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    
    // Advanced Features
    mapping(address => bool) public whitelist;
    mapping(address => uint256) public purchaseHistory;
    uint256 public totalMaticRaised; // Total MATIC raised from ICO (Polygon native currency)
    bool public whitelistEnabled = false;
    
    // Custom Errors (reduces bytecode size vs string messages)
    error InvalidAddress();
    error ICOAlreadyActive();
    error ICONotActive();
    error InvalidDuration();
    error ICONotStarted();
    error ICOEnded();
    error BelowMinPurchase();
    error AboveMaxPurchase();
    error NotWhitelisted();
    error InsufficientTokens();
    error InvalidPrice();
    error InvalidMinPurchase();
    error InvalidMaxPurchase();
    error NoMaticToWithdraw();
    error InvalidBurnAmount();
    error InsufficientContractBalance();
    
    // Events (Polygon Network - MATIC)
    event TokensPurchased(address indexed buyer, uint256 maticAmount, uint256 tokenAmount); // maticAmount in MATIC (wei)
    event ICOStarted(uint256 startTime, uint256 endTime);
    event ICOCompleted(uint256 totalSold, uint256 totalRaised); // totalRaised in MATIC (wei)
    event PriceUpdated(uint256 newPrice); // newPrice in MATIC (wei) per token
    event WhitelistUpdated(address indexed user, bool status);
    event WalletUpdated(string walletType, address oldWallet, address newWallet);
    
    /**
     * @dev Constructor - Deploys GiveToken on Polygon Network
     * @param _charityWallet Address to receive charity allocation (35% - 350M GIVE)
     * @param _teamWallet Address to receive team allocation (15% - 150M GIVE)
     * @param _communityWallet Address to receive community allocation (15% - 150M GIVE)
     * 
     * Network: Polygon (MATIC)
     * All payments and transactions use MATIC as native currency
     * ICO supply is 35% (350M) which includes marketing and liquidity allocations
     */
    constructor(
        address _charityWallet,
        address _teamWallet,
        address _communityWallet
    ) ERC20("GiveToken", "GIVE") ERC20Permit("GiveToken") Ownable(msg.sender) {
        if (_charityWallet == address(0)) revert InvalidAddress();
        if (_teamWallet == address(0)) revert InvalidAddress();
        if (_communityWallet == address(0)) revert InvalidAddress();
        
        charityWallet = _charityWallet;
        teamWallet = _teamWallet;
        communityWallet = _communityWallet;
        
        // Set up access control
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        
        // Mint initial supply distribution
        _mint(address(this), ICO_SUPPLY);              // ICO tokens to contract (35% - includes marketing & liquidity)
        _mint(charityWallet, CHARITY_SUPPLY);          // Charity tokens (35%)
        _mint(teamWallet, TEAM_SUPPLY);                // Team tokens (15%)
        _mint(communityWallet, COMMUNITY_SUPPLY);      // Community tokens (15%)
    }
    
    /**
     * @dev Start the ICO on Polygon Network
     * @param _durationInDays ICO duration in days
     * @notice ICO accepts MATIC payments on Polygon
     * @notice Price: 0.0001 MATIC per GIVE token
     */
    function startICO(uint256 _durationInDays) external onlyRole(ADMIN_ROLE) {
        if (icoActive) revert ICOAlreadyActive();
        if (_durationInDays == 0) revert InvalidDuration();
        
        icoStartTime = block.timestamp;
        icoEndTime = block.timestamp + (_durationInDays * 1 days);
        icoActive = true;
        
        emit ICOStarted(icoStartTime, icoEndTime);
    }
    
    /**
     * @dev End the ICO manually
     */
    function endICO() external onlyRole(ADMIN_ROLE) {
        if (!icoActive) revert ICONotActive();
        icoActive = false;
        emit ICOCompleted(icoTokensSold, totalMaticRaised);
    }
    
    /**
     * @dev Internal function to process token purchase
     */
    function _purchaseTokens() internal {
        if (!icoActive) revert ICONotActive();
        if (block.timestamp < icoStartTime) revert ICONotStarted();
        if (block.timestamp > icoEndTime) revert ICOEnded();
        if (msg.value < minPurchase) revert BelowMinPurchase();
        if (msg.value > maxPurchase) revert AboveMaxPurchase();
        
        // Check whitelist if enabled
        if (whitelistEnabled) {
            if (!whitelist[msg.sender]) revert NotWhitelisted();
        }
        
        uint256 tokenAmount = (msg.value * 10**18) / icoPrice;
        if (icoTokensSold + tokenAmount > ICO_SUPPLY) revert InsufficientTokens();
        
        icoTokensSold += tokenAmount;
        totalMaticRaised += msg.value;
        purchaseHistory[msg.sender] += tokenAmount;
        
        // Transfer tokens to buyer
        _transfer(address(this), msg.sender, tokenAmount);
        
        emit TokensPurchased(msg.sender, msg.value, tokenAmount);
    }
    
    /**
     * @dev Purchase tokens during ICO
     * @notice Sends MATIC to contract and receives GIVE tokens
     * @notice Minimum purchase: 0.01 MATIC, Maximum: 5 MATIC per transaction
     * @notice Price: 0.0001 MATIC per GIVE token (adjustable by admin)
     */
    function buyTokens() external payable nonReentrant whenNotPaused {
        _purchaseTokens();
    }
    
    /**
     * @dev Update ICO price (only admin)
     * @param _newPrice New price per token in wei (MATIC on Polygon)
     * @notice Price is denominated in MATIC (Polygon native currency)
     * @notice Example: 0.0001 MATIC = 100000000000000 wei
     */
    function updatePrice(uint256 _newPrice) external onlyRole(ADMIN_ROLE) {
        if (_newPrice == 0) revert InvalidPrice();
        icoPrice = _newPrice;
        emit PriceUpdated(_newPrice);
    }
    
    /**
     * @dev Update purchase limits
     * @param _minPurchase Minimum purchase amount in MATIC (wei)
     * @param _maxPurchase Maximum purchase amount in MATIC (wei)
     * @notice Limits are in MATIC (Polygon native currency)
     */
    function updatePurchaseLimits(uint256 _minPurchase, uint256 _maxPurchase) external onlyRole(ADMIN_ROLE) {
        if (_minPurchase == 0) revert InvalidMinPurchase();
        if (_maxPurchase <= _minPurchase) revert InvalidMaxPurchase();
        minPurchase = _minPurchase;
        maxPurchase = _maxPurchase;
    }
    
    /**
     * @dev Whitelist management
     */
    function updateWhitelist(address[] calldata _users, bool _status) external onlyRole(ADMIN_ROLE) {
        for (uint256 i = 0; i < _users.length; i++) {
            whitelist[_users[i]] = _status;
            emit WhitelistUpdated(_users[i], _status);
        }
    }
    
    function setWhitelistEnabled(bool _enabled) external onlyRole(ADMIN_ROLE) {
        whitelistEnabled = _enabled;
    }
    
    /**
     * @dev Withdraw MATIC from contract (only admin)
     */
    function withdrawMATIC() external onlyRole(ADMIN_ROLE) {
        uint256 balance = address(this).balance;
        if (balance == 0) revert NoMaticToWithdraw();
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        if (!success) revert NoMaticToWithdraw();
    }
    
    /**
     * @dev Emergency withdraw MATIC to specific address
     */
    function emergencyWithdrawMATIC(address payable _to) external onlyRole(ADMIN_ROLE) {
        if (_to == address(0)) revert InvalidAddress();
        uint256 balance = address(this).balance;
        if (balance == 0) revert NoMaticToWithdraw();
        
        (bool success, ) = _to.call{value: balance}("");
        if (!success) revert NoMaticToWithdraw();
    }
    
    /**
     * @dev Quarterly burn function for deflationary mechanism
     * @param amount Amount of tokens to burn
     */
    function quarterlyBurn(uint256 amount) external onlyRole(ADMIN_ROLE) {
        if (amount == 0) revert InvalidBurnAmount();
        if (balanceOf(address(this)) < amount) revert InsufficientContractBalance();
        _burn(address(this), amount);
    }
    
    /**
     * @dev Enhanced pause functions with role-based access
     */
    function pause() external onlyRole(PAUSER_ROLE) {
        _pause();
    }
    
    function unpause() external onlyRole(PAUSER_ROLE) {
        _unpause();
    }
    
    /**
     * @dev Override nonces to resolve conflict between ERC20Permit and Nonces
     */
    function nonces(address owner) public view virtual override(ERC20Permit, Nonces) returns (uint256) {
        return super.nonces(owner);
    }
    
    /**
     * @dev Override update to add pause functionality and voting power tracking (OpenZeppelin v5)
     */
    function _update(address from, address to, uint256 value) internal override(ERC20, ERC20Votes) whenNotPaused {
        super._update(from, to, value);
    }
    
    /**
     * @dev Receive MATIC directly (for ICO purchases on Polygon)
     * @notice Allows users to send MATIC directly to contract address
     * @notice Automatically processes token purchase if ICO is active
     * @notice Network: Polygon Mainnet (Chain ID: 137)
     */
    receive() external payable nonReentrant whenNotPaused {
        _purchaseTokens();
    }
}
