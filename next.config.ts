import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  eslint: {
    // todo: make sure later to follow the eslint rules
    ignoreDuringBuilds: true,
  },
};

export default withNextIntl(nextConfig);
