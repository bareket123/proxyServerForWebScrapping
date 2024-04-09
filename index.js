import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// Define the target URL you want to proxy to
const target = 'https://cooking.nytimes.com';

// Create a proxy middleware instance with the target URL
const proxyMiddleware = createProxyMiddleware({
    target,
    changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
    pathRewrite: {
        '^/proxy': '', // remove '/proxy' from the URL
    },
});

// Use the proxy middleware
app.use('/proxy', (req, res, next) => {
    // Set Access-Control-Allow-Origin header based on the origin of the incoming request
    const allowedOrigins = ['http://localhost:3000', 'https://cooking.nytimes.com']; // Add more origins if needed
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    proxyMiddleware(req, res, next);
});

// Start the server
const port = 3001; // choose any port you like
app.listen(port, () => {
    console.log(`Proxy server is running on http://localhost:${port}`);
        }
        )
