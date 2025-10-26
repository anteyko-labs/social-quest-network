// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title RewardToken
 * @dev ERC20 token for Social Quest Network rewards
 * This token is used for quest rewards and can be earned through gasless transactions
 */
contract RewardToken is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 1000000 * 10**18; // 1 million tokens
    uint256 public constant REWARD_RATE = 100 * 10**18; // 100 tokens per quest completion
    
    mapping(address => bool) public authorizedMinters;
    
    event TokensMinted(address indexed to, uint256 amount);
    event MinterAuthorized(address indexed minter);
    event MinterRevoked(address indexed minter);

    constructor() ERC20("Quest Reward Token", "QRT") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    /**
     * @dev Authorize a contract to mint tokens (for quest rewards)
     */
    function authorizeMinter(address _minter) external onlyOwner {
        authorizedMinters[_minter] = true;
        emit MinterAuthorized(_minter);
    }

    /**
     * @dev Revoke minting authorization
     */
    function revokeMinter(address _minter) external onlyOwner {
        authorizedMinters[_minter] = false;
        emit MinterRevoked(_minter);
    }

    /**
     * @dev Mint tokens for quest completion (GASLESS transaction)
     * Only authorized contracts can call this
     */
    function mintQuestReward(address _to, uint256 _amount) external {
        require(authorizedMinters[msg.sender], "Not authorized to mint");
        require(_amount > 0, "Amount must be positive");
        
        _mint(_to, _amount);
        emit TokensMinted(_to, _amount);
    }

    /**
     * @dev Get user's token balance
     */
    function getUserBalance(address _user) external view returns (uint256) {
        return balanceOf(_user);
    }

    /**
     * @dev Get total supply
     */
    function getTotalSupply() external view returns (uint256) {
        return totalSupply();
    }
}
