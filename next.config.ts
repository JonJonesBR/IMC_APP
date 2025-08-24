import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  // 禁用 Next.js 热重载，由 nodemon 处理重编译
  reactStrictMode: false,
  webpack: (config, { dev }) => {
    if (dev) {
      // 禁用 webpack 的热模块替换
      config.watchOptions = {
        ignored: ['**/*'], // 忽略所有文件变化
      };
    }
    return config;
  },
  eslint: {
    // 构建时忽略ESLint错误
    ignoreDuringBuilds: true,
  },
  // Export static HTML for hosting on GitHub Pages
  output: 'export',
  // Quando publicado no GitHub Pages em um repositório (https://<user>.github.io/IMC_APP),
  // precisamos prefixar as rotas e assets com o nome do repositório.
  basePath: '/IMC_APP',
  assetPrefix: '/IMC_APP/',
};

export default nextConfig;
