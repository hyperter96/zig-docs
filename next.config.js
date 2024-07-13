const withMarkdoc = require('@markdoc/next.js')
const { withPlausibleProxy } = require('next-plausible')
const { i18n } = require('./i18nConfig')

/** @type {import('next').NextConfig} */
const nextConfig = withMarkdoc()({
  swcMinify: true,
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md'],
  experimental: {
    scrollRestoration: true,
    legacyBrowsers: false,
    images: { allowFutureImage: true },
  },
  i18n,
  trailingSlash: true,
  reactStrictMode: true,
})

module.exports = withPlausibleProxy()(nextConfig)
