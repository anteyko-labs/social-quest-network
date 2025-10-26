# 🚀 Vercel Deployment Guide

## Social Quest Network - Status Network Hackathon Project

### ✅ **PROJECT READY FOR DEPLOYMENT!**

**Build Status:** ✅ **SUCCESS** - All TypeScript errors fixed!

---

## 🎯 **QUICK DEPLOYMENT**

### **Option 1: Automatic deployment via GitHub**

1. **Go to [Vercel.com](https://vercel.com)**
2. **Sign in with GitHub**
3. **Click "New Project"**
4. **Select repository:** `anteyko-labs/social-quest-network`
5. **Settings:**
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
6. **Environment Variables (already configured in vercel.json):**
   ```
   NEXT_PUBLIC_STATUS_NETWORK_RPC=https://public.sepolia.rpc.status.network
   NEXT_PUBLIC_CHAIN_ID=1660990954
   NEXT_PUBLIC_SOCIAL_QUEST_ADDRESS=0x172EF1b0185273112b331637b67bFF523F7239bA
   NEXT_PUBLIC_REWARD_TOKEN_ADDRESS=0x7cF63006E9108CCeba3dFD60316aE49206e03A6F
   ```
7. **Click "Deploy"**

### **Option 2: Deployment via Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Sign in to account
vercel login

# Deploy project
vercel --prod
```

---

## 🏆 **DEPLOYMENT RESULTS**

After deployment you will get:

- ✅ **Live URL** - public link to the application
- ✅ **Automatic updates** - on every push to GitHub
- ✅ **HTTPS certificate** - secure connection
- ✅ **CDN** - fast loading worldwide
- ✅ **Monitoring** - analytics and logs

---

## 🔧 **TECHNICAL DETAILS**

### **Build Configuration:**
- **Framework:** Next.js 14.2.33
- **Node.js:** 18.x
- **Build Command:** `npm run build`
- **Output:** Static + Serverless Functions

### **Environment Variables:**
```env
NEXT_PUBLIC_STATUS_NETWORK_RPC=https://public.sepolia.rpc.status.network
NEXT_PUBLIC_CHAIN_ID=1660990954
NEXT_PUBLIC_SOCIAL_QUEST_ADDRESS=0x172EF1b0185273112b331637b67bFF523F7239bA
NEXT_PUBLIC_REWARD_TOKEN_ADDRESS=0x7cF63006E9108CCeba3dFD60316aE49206e03A6F
```

### **Contract Addresses (Deployed on Status Network Sepolia):**
- **SocialQuestNetwork:** `0x172EF1b0185273112b331637b67bFF523F7239bA`
- **RewardToken:** `0x7cF63006E9108CCeba3dFD60316aE49206e03A6F`

---

## 🎯 **HACKATHON READINESS**

### ✅ **All requirements met:**

1. **✅ Gasless Transactions** - Status Network Sepolia
2. **✅ Smart Contracts Deployed** - real addresses
3. **✅ Frontend Application** - Next.js + TypeScript
4. **✅ Wallet Integration** - MetaMask + RainbowKit
5. **✅ GitHub Repository** - public code
6. **✅ Live Demo** - ready for deployment

### 🏆 **Ready to win the hackathon!**

---

## 📞 **SUPPORT**

If you encounter deployment issues:

1. **Check logs** in Vercel Dashboard
2. **Make sure** all environment variables are configured
3. **Check** that GitHub repository is public
4. **Refer to** Vercel documentation

**Good luck in the hackathon! 🚀🏆**