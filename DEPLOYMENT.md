# 🚀 Deployment Guide - Social Quest Network

## Status Network Sepolia Deployment

### Prerequisites

1. **Status Network Sepolia Testnet ETH**
   - Get testnet ETH from faucets:
     - [Alchemy Sepolia Faucet](https://www.alchemy.com/faucets/ethereum-sepolia)
     - [Sepolia Faucet](https://sepoliafaucet.com/)

2. **Environment Setup**
   ```bash
   # Copy environment file
   cp env.example .env.local
   
   # Add your private key and configuration
   PRIVATE_KEY=your-private-key-here
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id
   ```

### Step 1: Deploy Smart Contracts

```bash
# Compile contracts
npm run compile

# Deploy to Status Network Sepolia
npm run deploy
```

### Step 2: Update Environment Variables

After deployment, update your `.env.local` with the deployed contract addresses:

```env
NEXT_PUBLIC_SOCIAL_QUEST_ADDRESS=0x... # From deployment output
NEXT_PUBLIC_REWARD_TOKEN_ADDRESS=0x... # From deployment output
```

### Step 3: Start Frontend

```bash
npm run dev
```

### Step 4: Test Gasless Transactions

1. Connect wallet to Status Network Sepolia
2. Create a quest (should be gasless)
3. Complete a quest (should be gasless)
4. Verify transactions in [Status Explorer](https://explorer.status.network)

## Network Configuration

### Status Network Sepolia
- **Network Name**: Status Network Sepolia
- **RPC URL**: https://rpc.status.network/status-sepolia
- **Chain ID**: 23011913
- **Currency Symbol**: ETH
- **Block Explorer**: https://explorer.status.network

### Adding to MetaMask

1. Open MetaMask
2. Click "Add Network"
3. Enter the network details above
4. Save and switch to Status Network Sepolia

## Verification

### Contract Verification

```bash
# Verify contracts on Status Explorer
npx hardhat verify --network statusSepolia <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

### Gasless Transaction Proof

All transactions should show:
- Gas Price: 0
- Gas Used: 0
- Transaction Fee: 0

## Demo Checklist

- [ ] Contracts deployed successfully
- [ ] Frontend accessible at localhost:3000
- [ ] Wallet connects to Status Network Sepolia
- [ ] Quest creation works (gasless)
- [ ] Quest completion works (gasless)
- [ ] NFT achievements mint (gasless)
- [ ] Reward tokens distributed (gasless)

## Troubleshooting

### Common Issues

1. **"Insufficient funds" error**
   - Ensure you have Sepolia ETH in your wallet
   - Check you're connected to Status Network Sepolia

2. **Contract not found**
   - Verify contract addresses in .env.local
   - Ensure contracts are deployed to correct network

3. **Transaction fails**
   - Check network connection
   - Verify wallet is connected to Status Network Sepolia

### Support

- Status Network Docs: https://docs.status.network
- Developer Chat: https://t.me/statusl2/856
- GitHub Issues: Create an issue in the repository

## Production Deployment

For production deployment:

1. Deploy to Status Network Mainnet (when available)
2. Update RPC endpoints
3. Configure production environment variables
4. Set up monitoring and analytics
5. Implement proper error handling

---

**Ready to revolutionize social gaming with gasless transactions! 🎮✨**
