const express = require('express');
const fs = require('fs');
const path = require('path');
const net = require('net');
const sharp = require('sharp');
const app = express();
const port = 3000;
const tcpPort = 8888;

// Helper function to determine the base directory
function getBaseDir() {
    // Detect if we are running inside a pkg bundle
    if (process.pkg) {
        // When running in the pkg executable, __dirname will give us a path inside the snapshot filesystem
        // We need to use process.cwd() to get the path where the executable is located
        return process.cwd();
    } else {
        // When not running inside a pkg bundle, we can use __dirname as usual
        return __dirname;
    }
}

// Function to get the latest image
function getLatestImage() {
    const baseDir = getBaseDir();
    const imageDir = path.join(baseDir, 'received_images'); // Define the path to the image directory
    if (!fs.existsSync(imageDir)) {
        // If the directory does not exist, there can't be any images
        return null;
    }

    const files = fs.readdirSync(imageDir)
        .filter(file => path.extname(file).toLowerCase() === '.jpg')
        .map(file => ({
            file,
            mtime: fs.statSync(path.join(imageDir, file)).mtime
        }))
        .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

    return files.length > 0 ? path.join('received_images', files[0].file) : null;
}

// Route to serve the latest image
app.get('/latest-image', (req, res) => {
    const latestImage = getLatestImage();
    console.log(`Trying to serve image: ${latestImage}`);

    if (latestImage) {
        const imagePath = path.join(getBaseDir(), latestImage);
        console.log(`Full image path: ${imagePath}`);
        res.sendFile(imagePath);
    } else {
        console.log(`No images found. Current directory: ${getBaseDir()}`);
        res.status(404).send('No images found');
    }
});

// Route for the webpage
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Latest Image Viewer</title>
                <meta http-equiv="refresh" content="5">
            </head>
            <body>
                <img src="/latest-image" alt="Latest Image" style="max-width: 100%; height: auto;">
            </body>
        </html>
    `);
});

// TCP Server for receiving images
const tcpServer = net.createServer(clientSocket => {
    console.log('Client connected for image transfer.');

    const chunks = [];
    clientSocket.on('data', chunk => {
        chunks.push(chunk);
    });

    clientSocket.on('end', () => {
        const buffer = Buffer.concat(chunks);
        // Save the file outside of the snapshot filesystem
        const outputPath = path.join(getBaseDir(), 'received_images');
        if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath);
        }
        const filename = path.join(outputPath, `screenshot_${new Date().toISOString().replace(/:/g, '-')}.jpg`);

        sharp(buffer)
            .toFile(filename)
            .then(() => console.log(`Screenshot saved as ${filename}`))
            .catch(err => console.error('Error processing image:', err));
    });

    clientSocket.on('error', err => {
        console.error('TCP socket error:', err);
    });
});

tcpServer.listen(tcpPort, () => {
    console.log(`TCP server listening for images on port ${tcpPort}`);
});

// Start HTTP server
app.listen(port, () => {
    console.log(`HTTP server running at http://localhost:${port}`);
});
