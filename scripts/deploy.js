const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying Social Quest Network to Status Network Sepolia...");
  
  // Get the contract factories
  const SocialQuestNetwork = await ethers.getContractFactory("SocialQuestNetwork");
  const RewardToken = await ethers.getContractFactory("RewardToken");
  
  // Deploy contracts
  console.log("📝 Deploying RewardToken...");
  const rewardToken = await RewardToken.deploy();
  await rewardToken.waitForDeployment();
  const rewardTokenAddress = await rewardToken.getAddress();
  console.log("✅ RewardToken deployed to:", rewardTokenAddress);
  
  console.log("🎮 Deploying SocialQuestNetwork...");
  const socialQuestNetwork = await SocialQuestNetwork.deploy();
  await socialQuestNetwork.waitForDeployment();
  const socialQuestNetworkAddress = await socialQuestNetwork.getAddress();
  console.log("✅ SocialQuestNetwork deployed to:", socialQuestNetworkAddress);
  
  // Authorize the main contract to mint reward tokens
  console.log("🔐 Authorizing SocialQuestNetwork to mint tokens...");
  await rewardToken.authorizeMinter(socialQuestNetworkAddress);
  console.log("✅ Authorization complete");
  
  // Display deployment information
  console.log("\n🎉 Deployment Complete!");
  console.log("=====================================");
  console.log("RewardToken Address:", rewardTokenAddress);
  console.log("SocialQuestNetwork Address:", socialQuestNetworkAddress);
  console.log("Network: Status Network Sepolia");
  console.log("Gasless Transactions: ✅ Enabled");
  console.log("=====================================");
  
  // Save deployment info
  const deploymentInfo = {
    network: "statusSepolia",
    rewardToken: rewardTokenAddress,
    socialQuestNetwork: socialQuestNetworkAddress,
    deployedAt: new Date().toISOString(),
    gasless: true
  };
  
  const fs = require('fs');
  fs.writeFileSync('deployment.json', JSON.stringify(deploymentInfo, null, 2));
  console.log("📄 Deployment info saved to deployment.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
