import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  compiler: { removeConsole: process.env.NODE_ENV === 'production' },
  experimental: { optimizePackageImports: ['lucide-react'] },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      { source: '/(.*)', headers: [{ key: 'X-DNS-Prefetch-Control', value: 'on' }, { key: 'X-Content-Type-Options', value: 'nosniff' }, { key: 'Referrer-Policy', value: 'origin-when-cross-origin' }] },
      { source: '/(_next/static|images|fonts|icons)/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ]
  },
  webpack(config, { isServer }) {
    config.resolve.alias = { ...config.resolve.alias, 'moment': false }
    if (!isServer) {
        config.optimization.splitChunks = config.optimization.splitChunks || { cacheGroups: {} };
        config.optimization.splitChunks.cacheGroups = {
            ...config.optimization.splitChunks.cacheGroups,
            framerMotion: { name: 'framer-motion', test: /[\\/]node_modules[\\/]framer-motion[\\/]/, chunks: 'all', priority: 30 },
            lucide: { name: 'lucide-react', test: /[\\/]node_modules[\\/]lucide-react[\\/]/, chunks: 'all', priority: 20 },
        };
    }
    return config
  },
}
export default withBundleAnalyzer(nextConfig)