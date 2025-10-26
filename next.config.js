/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_STATUS_NETWORK_RPC: 'https://rpc.status.network/status-sepolia',
    NEXT_PUBLIC_CHAIN_ID: '23011913',
  },
}

module.exports = nextConfig
