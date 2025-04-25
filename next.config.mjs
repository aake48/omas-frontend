/** @type {import('next').NextConfig} */
const nextConfig = {
        experimental: {
            serverActions: {
                bodySizeLimit: '10mb', // bodySizeLimit set for image uploads
            },
        }
    
};

export default nextConfig;
