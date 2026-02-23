/** @type {import('next').NextConfig} */
const nextConfig = {
    // Allow cross-origin requests to the Render backend
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                    { key: 'X-XSS-Protection', value: '1; mode=block' },
                ],
            },
        ];
    },
    images: {
        remotePatterns: [],
    },
};

module.exports = nextConfig;
