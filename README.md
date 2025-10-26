# 🎯 Social Quest Network

**The First Gasless Social Gaming Platform on Status Network**

[![Status Network](https://img.shields.io/badge/Status%20Network-Sepolia-blue)](https://status.network)
[![Gasless](https://img.shields.io/badge/Transactions-100%25%20Gasless-green)](https://status.network)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## 🚀 Overview

Social Quest Network is a revolutionary social gaming platform that leverages Status Network's gasless transaction capabilities to create an accessible, engaging, and sustainable ecosystem for community-driven quests and rewards.

### ✨ Key Features

- **🎮 Gasless Gaming**: Every interaction is completely gasless thanks to Status Network
- **🏆 Social Quests**: Create and complete community-driven challenges
- **💎 NFT Achievements**: Earn unique NFTs for quest completion
- **⭐ Reputation System**: Build your reputation through quest participation
- **🪙 Reward Tokens**: Earn QRT (Quest Reward Tokens) for completing quests
- **🔗 Easy Onboarding**: Connect wallet and start immediately - no gas fees!

## 🏗️ Architecture

### Smart Contracts

- **SocialQuestNetwork.sol**: Main contract managing quests, reputation, and NFT achievements
- **RewardToken.sol**: ERC20 token for quest rewards (QRT)

### Frontend

- **Next.js 14**: Modern React framework with App Router
- **Wagmi + RainbowKit**: Web3 wallet integration
- **Tailwind CSS**: Beautiful, responsive UI
- **TypeScript**: Type-safe development

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/social-quest-network.git
cd social-quest-network
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file:

```env
NEXT_PUBLIC_SOCIAL_QUEST_ADDRESS=0x...
NEXT_PUBLIC_REWARD_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id
PRIVATE_KEY=your-private-key
```

### 4. Deploy Contracts

```bash
# Compile contracts
npm run compile

# Deploy to Status Network Sepolia
npm run deploy
```

### 5. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🌐 Status Network Integration

### Network Configuration

- **Network Name**: Status Network Sepolia
- **Chain ID**: 23011913
- **RPC URL**: https://rpc.status.network/status-sepolia
- **Explorer**: https://explorer.status.network

### Gasless Transactions

All transactions on Status Network are gasless, making the platform accessible to users without ETH for gas fees. This is perfect for:

- Social gaming applications
- Community-driven platforms
- Educational projects
- Micro-transaction heavy dApps

## 🎮 How It Works

### 1. Create Quests
Users can create quests with:
- Title and description
- Reward amount in QRT tokens
- Proof requirements

### 2. Complete Quests
Users can:
- Browse active quests
- Complete quests by providing proof
- Earn QRT tokens and reputation points
- Receive NFT achievements

### 3. Build Reputation
- Gain reputation points for quest participation
- Unlock higher-tier rewards
- Become a verified community member

## 🏆 Hackathon Submission

### Requirements Met ✅

- ✅ **Gasless Transactions**: All interactions are gasless on Status Network
- ✅ **Status Network Sepolia**: Deployed and functional on testnet
- ✅ **Easy Onboarding**: Simple wallet connection, no gas fees required
- ✅ **Public Code**: Open source on GitHub
- ✅ **Live Demo**: Fully functional application

### Evaluation Criteria

1. **Functionality**: Maximizes gasless transaction benefits for social gaming
2. **Fun**: Engaging quest system with gamification elements
3. **UX**: Intuitive interface with smooth user experience

## 🚀 Deployment

### Status Network Sepolia

The application is deployed on Status Network Sepolia with the following features:

- Gasless quest creation
- Gasless quest completion
- Gasless reward distribution
- Gasless NFT minting

### Demo Links

- **Live Application**: [https://social-quest-network.vercel.app](https://social-quest-network.vercel.app)
- **GitHub Repository**: [https://github.com/your-username/social-quest-network](https://github.com/your-username/social-quest-network)
- **Contract Addresses**: See `deployment.json`

## 🛡️ Security

- Smart contracts use OpenZeppelin libraries
- ReentrancyGuard protection
- Access control for admin functions
- Input validation and sanitization

## 📈 Future Roadmap

- [ ] Mobile app development
- [ ] Advanced quest types (photo, video, location)
- [ ] Quest categories and tags
- [ ] Social features (following, messaging)
- [ ] Integration with other L2s
- [ ] Governance token for community voting

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Status Network team for the gasless infrastructure
- Scaffold-ETH for the development framework
- OpenZeppelin for secure smart contract libraries
- The Web3 community for inspiration and support

---

**Built with ❤️ for the Status Network Hackathon**

*Making social gaming accessible to everyone through gasless transactions!*
