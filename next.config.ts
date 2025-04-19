import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: '/forecast',
        missing: [
          {
            type: 'query',
            key: 'lat'
          },
          {
            type: 'query',
            key: 'lon'
          }
        ],
        destination: '/',
        permanent: false
      },
      {
        source: '/forecast',
        missing: [
          {
            type: 'query',
            key: 'lat'
          }
        ],
        destination: '/',
        permanent: false
      },
      {
        source: '/forecast',
        missing: [
          {
            type: 'query',
            key: 'lon'
          }
        ],
        destination: '/',
        permanent: false
      }
    ]
  }
}

export default nextConfig
