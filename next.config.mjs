/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Add MDX configuration
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
}

export default nextConfig
