import type { NextConfig } from "next";
const defaultPort="4000"
const nextConfig: NextConfig = {
  
  /* config options here */
  reactCompiler: true,
  env:{
    SERVER_PORT: process.env.SERVER_PORT,
    APPLICATION_PORT:process.env.PORT||defaultPort
  }
};

export default nextConfig;
