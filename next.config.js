/**
 * @type {import('next').NextConfig}
 */

 const withPlugins = require('next-compose-plugins');
 const withImages = require('next-images');
 const env = {};
 
 Object.keys(process.env).forEach((key) => {
     env[key] = process.env[key];
 });
 
 const nextConfig = {
     webpack5: true,
     compiler: {
         styledComponents: true,
     },
     webpack: (config) => {
         config.resolve.fallback = { fs: false };
 
         return config;
     },
     images: {
         domains: ['picsum.photos', 'jacopopanzera.com', 'localhost'],
     },
 };
 
 module.exports = withPlugins([[withImages]], nextConfig);
 