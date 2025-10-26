// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract SocialQuestNetwork is ERC721, Ownable, ReentrancyGuard {
    // Quest structure
    struct Quest {
        uint256 id;
        address creator;
        string title;
        string description;
        uint256 reward;
        bool isActive;
        bool isCompleted;
        address completer;
        uint256 createdAt;
        uint256 completedAt;
    }

    // User reputation system
    struct UserProfile {
        uint256 reputation;
        uint256 questsCreated;
        uint256 questsCompleted;
        uint256 totalRewardsEarned;
        bool isVerified;
    }

    // State variables
    mapping(uint256 => Quest) public quests;
    mapping(address => UserProfile) public userProfiles;
    mapping(address => uint256[]) public userQuests;
    mapping(address => uint256[]) public userCompletedQuests;
    
    uint256 public questCounter;
    uint256 public totalQuests;
    uint256 public totalRewardsDistributed;

    // Events
    event QuestCreated(uint256 indexed questId, address indexed creator, string title, uint256 reward);
    event QuestCompleted(uint256 indexed questId, address indexed completer, uint256 reward);
    event RewardClaimed(address indexed user, uint256 amount);
    event ReputationUpdated(address indexed user, uint256 newReputation);

    constructor() ERC721("Social Quest NFT", "SQN") Ownable(msg.sender) {}

    /**
     * @dev Create a new quest (GASLESS transaction)
     */
    function createQuest(
        string memory _title,
        string memory _description,
        uint256 _reward
    ) external returns (uint256) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(_reward > 0, "Reward must be positive");

        uint256 questId = questCounter++;
        quests[questId] = Quest({
            id: questId,
            creator: msg.sender,
            title: _title,
            description: _description,
            reward: _reward,
            isActive: true,
            isCompleted: false,
            completer: address(0),
            createdAt: block.timestamp,
            completedAt: 0
        });

        userQuests[msg.sender].push(questId);
        userProfiles[msg.sender].questsCreated++;
        totalQuests++;

        emit QuestCreated(questId, msg.sender, _title, _reward);
        return questId;
    }

    /**
     * @dev Complete a quest (GASLESS transaction)
     */
    function completeQuest(uint256 _questId) external nonReentrant {
        Quest storage quest = quests[_questId];
        require(quest.isActive, "Quest is not active");
        require(!quest.isCompleted, "Quest already completed");
        require(quest.creator != msg.sender, "Cannot complete your own quest");

        quest.isCompleted = true;
        quest.completer = msg.sender;
        quest.completedAt = block.timestamp;
        quest.isActive = false;

        // Update user profiles
        userProfiles[msg.sender].questsCompleted++;
        userProfiles[msg.sender].totalRewardsEarned += quest.reward;
        userProfiles[msg.sender].reputation += 10; // Reputation points for completing

        userProfiles[quest.creator].reputation += 5; // Creator gets reputation for good quest

        userCompletedQuests[msg.sender].push(_questId);
        totalRewardsDistributed += quest.reward;

        // Mint NFT achievement for completer
        _safeMint(msg.sender, _questId);

        emit QuestCompleted(_questId, msg.sender, quest.reward);
        emit ReputationUpdated(msg.sender, userProfiles[msg.sender].reputation);
    }

    /**
     * @dev Get user profile
     */
    function getUserProfile(address _user) external view returns (UserProfile memory) {
        return userProfiles[_user];
    }

    /**
     * @dev Get quest details
     */
    function getQuest(uint256 _questId) external view returns (Quest memory) {
        return quests[_questId];
    }

    /**
     * @dev Get user's created quests
     */
    function getUserQuests(address _user) external view returns (uint256[] memory) {
        return userQuests[_user];
    }

    /**
     * @dev Get user's completed quests
     */
    function getUserCompletedQuests(address _user) external view returns (uint256[] memory) {
        return userCompletedQuests[_user];
    }

    /**
     * @dev Get all active quests
     */
    function getActiveQuests() external view returns (uint256[] memory) {
        uint256[] memory activeQuests = new uint256[](totalQuests);
        uint256 count = 0;
        
        for (uint256 i = 0; i < questCounter; i++) {
            if (quests[i].isActive && !quests[i].isCompleted) {
                activeQuests[count] = i;
                count++;
            }
        }
        
        // Resize array to actual count
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = activeQuests[i];
        }
        
        return result;
    }

    /**
     * @dev Get platform statistics
     */
    function getPlatformStats() external view returns (
        uint256 _totalQuests,
        uint256 _totalRewardsDistributed,
        uint256 _totalUsers
    ) {
        return (totalQuests, totalRewardsDistributed, questCounter);
    }

    /**
     * @dev Verify user (only owner)
     */
    function verifyUser(address _user) external onlyOwner {
        userProfiles[_user].isVerified = true;
    }

    /**
     * @dev Emergency pause (only owner)
     */
    function pauseQuest(uint256 _questId) external onlyOwner {
        quests[_questId].isActive = false;
    }
}
