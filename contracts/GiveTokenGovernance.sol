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
 * @notice This governance contract is deployed on Polygon Network.
 * @notice All transactions and proposals execute on Polygon using MATIC for gas.
 */

// Using GitHub imports for Remix compatibility (OpenZeppelin v5.0.0 - no mcopy opcode)
// For Hardhat: Comment these out and uncomment the @openzeppelin imports below
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/governance/Governor.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/governance/extensions/GovernorSettings.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/governance/extensions/GovernorCountingSimple.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/governance/extensions/GovernorVotes.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/governance/extensions/GovernorTimelockControl.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/governance/TimelockController.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v5.0.0/contracts/interfaces/IERC5805.sol";
import "./GiveToken.sol";

// For Hardhat (uncomment these and comment GitHub imports above):
// import "@openzeppelin/contracts/governance/Governor.sol";
// import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
// import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
// import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
// import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
// import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";
// import "@openzeppelin/contracts/governance/TimelockController.sol";
// import "@openzeppelin/contracts/interfaces/IERC5805.sol";

/**
 * @title GiveTokenGovernance - DAO Governance for GiveToken on Polygon
 * @dev Implements decentralized governance for the GiveToken ecosystem on Polygon Network
 * Based on OpenZeppelin Governor with custom settings for CharityDAO
 * 
 * Network: Polygon Mainnet (Chain ID: 137)
 * Native Currency: MATIC
 * Block Explorer: https://polygonscan.com
 * 
 * Features:
 * - Category-based proposals (Platform, Charity, Economic, Emergency)
 * - Custom voting periods per category
 * - Custom approval requirements per category
 * - 5% quorum requirement
 * - 48-hour timelock for proposal execution
 * - 1 GIVE token = 1 vote
 */
contract GiveTokenGovernance is 
    Governor, 
    GovernorSettings,
    GovernorCountingSimple,
    GovernorVotes,
    GovernorVotesQuorumFraction,
    GovernorTimelockControl
{
    // Proposal thresholds based on category (in GIVE tokens on Polygon Network)
    uint256 public constant PLATFORM_UPGRADE_THRESHOLD = 1_000_000 * 10**18; // 1M GIVE tokens required
    uint256 public constant CHARITY_APPROVAL_THRESHOLD = 500_000 * 10**18;   // 500K GIVE tokens required
    uint256 public constant ECONOMIC_POLICY_THRESHOLD = 2_000_000 * 10**18;  // 2M GIVE tokens required
    uint256 public constant EMERGENCY_THRESHOLD = 5_000_000 * 10**18;        // 5M GIVE tokens required
    
    // Proposal category enum (for Polygon Network governance)
    enum ProposalCategory {
        PlatformUpgrade,    // 0 - Technical improvements, 1M GIVE threshold, 7 days, 50% approval
        CharityApproval,    // 1 - Charity partner onboarding, 500K GIVE threshold, 5 days, 66.67% approval
        EconomicPolicy,     // 2 - Tokenomics changes, 2M GIVE threshold, 10 days, 75% approval
        Emergency           // 3 - Critical updates, 5M GIVE threshold, 2 days, 50% approval
    }
    
    // Mapping proposal ID to category (Polygon Network)
    mapping(uint256 => ProposalCategory) public proposalCategories;
    
    // Mapping proposal ID to required approval threshold (in GIVE tokens)
    mapping(uint256 => uint256) public proposalThresholds;
    
    // Custom voting periods for different categories (in seconds, Polygon block time ~2s)
    mapping(ProposalCategory => uint256) public categoryVotingPeriods;
    
    // Custom approval requirements (as basis points, 10000 = 100%)
    // Percentage of FOR votes required out of total votes cast
    mapping(ProposalCategory => uint256) public categoryApprovalRequirements;
    
    // Custom Errors (reduces bytecode size)
    error InsufficientVotingPower();
    error InvalidProposalCategory();
    
    // Events (Polygon Network)
    event ProposalCreatedWithCategory(
        uint256 proposalId,
        ProposalCategory category,
        address proposer,
        uint256 threshold  // Threshold in GIVE tokens
    );
    
    /**
     * @dev Constructor - Deploys GiveTokenGovernance on Polygon Network
     * @param _token GiveToken contract address (must support ERC20Votes)
     * @param _timelock TimelockController address for proposal execution delay
     * 
     * Network: Polygon Mainnet (Chain ID: 137)
     * All governance operations execute on Polygon using MATIC for gas fees
     */
    constructor(
        IVotes _token,
        TimelockController _timelock
    )
        Governor("GIVE")
        GovernorSettings(
            1 days,  // Initial voting delay (1 day on Polygon)
            7 days,  // Initial voting period (7 days on Polygon)
            1_000_000 * 10**18  // Initial proposal threshold (1M GIVE tokens)
        )
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(5) // 5% quorum of total GIVE supply
        GovernorTimelockControl(_timelock)
    {
        // Set custom voting periods for each category (Polygon block time ~2 seconds)
        categoryVotingPeriods[ProposalCategory.PlatformUpgrade] = 7 days;   // ~302,400 blocks on Polygon
        categoryVotingPeriods[ProposalCategory.CharityApproval] = 5 days;  // ~216,000 blocks on Polygon
        categoryVotingPeriods[ProposalCategory.EconomicPolicy] = 10 days; // ~432,000 blocks on Polygon
        categoryVotingPeriods[ProposalCategory.Emergency] = 2 days;        // ~86,400 blocks on Polygon
        
        // Set custom approval requirements (as basis points, 10000 = 100%)
        // These percentages apply to total votes cast, not total supply
        categoryApprovalRequirements[ProposalCategory.PlatformUpgrade] = 5000; // 50% approval required
        categoryApprovalRequirements[ProposalCategory.CharityApproval] = 6667; // 66.67% approval required
        categoryApprovalRequirements[ProposalCategory.EconomicPolicy] = 7500;  // 75% approval required
        categoryApprovalRequirements[ProposalCategory.Emergency] = 5000;       // 50% approval required
    }
    
    /**
     * @dev Create a proposal with a specific category
     * @param targets Contract addresses to call (on Polygon Network)
     * @param values MATIC values to send (Polygon native currency, in wei)
     * @param calldatas Function calldatas
     * @param description Proposal description
     * @param category Proposal category (0=Platform, 1=Charity, 2=Economic, 3=Emergency)
     * @notice Network: Polygon Mainnet
     * @notice Requires minimum GIVE tokens based on proposal category
     */
    function proposeWithCategory(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description,
        ProposalCategory category
    ) public returns (uint256) {
        // Get threshold for this category
        uint256 threshold = getThresholdForCategory(category);
        
        // Check proposer has enough tokens
        IERC5805 votingToken = IERC5805(address(token()));
        if (votingToken.getPastVotes(msg.sender, block.number - 1) < threshold) {
            revert InsufficientVotingPower();
        }
        
        // Create proposal
        uint256 proposalId = propose(targets, values, calldatas, description);
        
        // Store category and threshold
        proposalCategories[proposalId] = category;
        proposalThresholds[proposalId] = threshold;
        
        emit ProposalCreatedWithCategory(proposalId, category, msg.sender, threshold);
        
        return proposalId;
    }
    
    /**
     * @dev Get threshold for a proposal category
     * @param category Proposal category (0=Platform, 1=Charity, 2=Economic, 3=Emergency)
     * @return Required GIVE token balance to create proposal in this category
     * @notice Thresholds are in GIVE tokens (18 decimals)
     * @notice Network: Polygon Mainnet
     */
    function getThresholdForCategory(ProposalCategory category) public pure returns (uint256) {
        if (category == ProposalCategory.PlatformUpgrade) return PLATFORM_UPGRADE_THRESHOLD;
        if (category == ProposalCategory.CharityApproval) return CHARITY_APPROVAL_THRESHOLD;
        if (category == ProposalCategory.EconomicPolicy) return ECONOMIC_POLICY_THRESHOLD;
        if (category == ProposalCategory.Emergency) return EMERGENCY_THRESHOLD;
        revert InvalidProposalCategory();
    }
    
    /**
     * @dev Override voting period based on proposal category
     * @return Voting period in seconds (Polygon block time ~2 seconds)
     */
    function votingPeriod() public view override(Governor, GovernorSettings) returns (uint256) {
        // For active proposals, use category-specific period
        // Otherwise use default (7 days on Polygon)
        return super.votingPeriod();
    }
    
    /**
     * @dev Get voting period for a specific proposal
     * @param proposalId The proposal ID
     * @return Voting period in seconds for this proposal category
     * @notice Period is based on proposal category (2-10 days on Polygon)
     */
    function getVotingPeriod(uint256 proposalId) public view returns (uint256) {
        ProposalCategory category = proposalCategories[proposalId];
        uint256 customPeriod = categoryVotingPeriods[category];
        return customPeriod > 0 ? customPeriod : super.votingPeriod();
    }
    
    /**
     * @dev Check if proposal meets approval requirements
     * @param proposalId The proposal ID to check
     * @return Whether proposal meets category-specific approval percentage
     * @notice Checks both quorum (5% of supply) and approval percentage
     * @notice Network: Polygon Mainnet
     */
    function proposalSucceeded(uint256 proposalId) public view returns (bool) {
        ProposalState proposalState = state(proposalId);
        if (proposalState != ProposalState.Succeeded) return false;
        
        // Get vote counts - proposalVotes returns a tuple (forVotes, againstVotes, abstainVotes)
        (uint256 forVotes, uint256 againstVotes, uint256 abstainVotes) = proposalVotes(proposalId);
        uint256 totalVotes = forVotes + againstVotes + abstainVotes;
        
        if (totalVotes == 0) return false;
        
        // Calculate approval percentage
        uint256 approvalPercentage = (forVotes * 10000) / totalVotes;
        
        // Get required approval for this category
        ProposalCategory category = proposalCategories[proposalId];
        uint256 requiredApproval = categoryApprovalRequirements[category];
        
        return approvalPercentage >= requiredApproval;
    }
    
    /**
     * @dev Override proposal threshold to use category-specific thresholds
     * @return Default proposal threshold in GIVE tokens (1M GIVE)
     * @notice Actual threshold depends on proposal category
     * @notice Network: Polygon Mainnet
     */
    function proposalThreshold() public pure override(Governor, GovernorSettings) returns (uint256) {
        // Default threshold for general proposals (Platform Upgrade category)
        return PLATFORM_UPGRADE_THRESHOLD;
    }
    
    // The following functions are overrides required by Solidity for OpenZeppelin Governor
    // All functions execute on Polygon Network (Chain ID: 137)
    
    /**
     * @dev Get voting delay before proposals become active
     * @return Voting delay in seconds (1 day on Polygon)
     * @notice Polygon block time ~2 seconds, so 1 day = ~43,200 blocks
     */
    function votingDelay()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.votingDelay();
    }
    
    /**
     * @dev Get quorum requirement for a specific block
     * @param blockNumber Block number to check quorum at
     * @return Required quorum in GIVE tokens (5% of total supply)
     * @notice Quorum: 5% of total GIVE supply must vote for proposal to be valid
     * @notice Network: Polygon Mainnet
     */
    function quorum(uint256 blockNumber)
        public
        view
        override(Governor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }
    
    /**
     * @dev Get current state of a proposal
     * @param proposalId The proposal ID
     * @return Current proposal state (Pending, Active, Succeeded, etc.)
     * @notice Network: Polygon Mainnet
     */
    function state(uint256 proposalId)
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (ProposalState)
    {
        return super.state(proposalId);
    }
    
    /**
     * @dev Create a new proposal
     * @param targets Contract addresses to call (on Polygon)
     * @param values MATIC values to send (in wei)
     * @param calldatas Function call data
     * @param description Proposal description
     * @return Proposal ID
     * @notice Use proposeWithCategory() for category-specific proposals
     * @notice Network: Polygon Mainnet
     */
    function propose(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description
    ) public override(Governor) returns (uint256) {
        return super.propose(targets, values, calldatas, description);
    }
    
    function proposalNeedsQueuing(uint256 proposalId)
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (bool)
    {
        return super.proposalNeedsQueuing(proposalId);
    }
    
    function _queueOperations(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) returns (uint48) {
        return super._queueOperations(proposalId, targets, values, calldatas, descriptionHash);
    }
    
    function _executeOperations(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) {
        super._executeOperations(proposalId, targets, values, calldatas, descriptionHash);
    }
    
    function _cancel(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) returns (uint256) {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }
    
    function _executor()
        internal
        view
        override(Governor, GovernorTimelockControl)
        returns (address)
    {
        return super._executor();
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(Governor)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
