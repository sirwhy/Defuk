/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Ignore all Node.js built-in modules in browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        buffer: false,
        path: false,
        os: false,
        child_process: false,
        cluster: false,
        dns: false,
        readline: false,
        console: false,
        process: false,
        module: false,
        http: false,
        https: false,
        zlib: false,
        util: false,
        events: false,
        querystring: false,
        assert: false,
        perf_hooks: false,
        timers: false,
        punycode: false,
        _http_common: false,
        _http_incoming: false,
        _http_outgoing: false,
        _http_server: false,
        // Fallback for missing modules
        '@react-native-async-storage/async-storage': false,
        'pino-pretty': false,
      };
    }
    return config;
  },
  // Ignore errors for missing Node modules
  experimental: {
    serverComponentsExternalPackages: ['@metamask/sdk'],
    webpackBuildWorker: true,
  },
};

module.exports = nextConfig;
