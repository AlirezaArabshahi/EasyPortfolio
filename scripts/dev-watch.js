#!/usr/bin/env node

import chokidar from 'chokidar';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let isBuilding = false;
let viteProcess = null;

// Function to run build
async function runBuild() {
    if (isBuilding) return;
    
    isBuilding = true;
    console.log('🔄 Changes detected, rebuilding...');
    
    try {
        const buildProcess = spawn('node', ['scripts/build.js'], {
            cwd: rootDir,
            stdio: 'inherit'
        });
        
        await new Promise((resolve, reject) => {
            buildProcess.on('close', (code) => {
                if (code === 0) {
                    console.log('✅ Build completed!');
                    resolve();
                } else {
                    reject(new Error(`Build failed with code ${code}`));
                }
            });
        });
    } catch (error) {
        console.error('❌ Build failed:', error.message);
    } finally {
        isBuilding = false;
    }
}

// Function to start Vite dev server
function startViteServer() {
    if (viteProcess) {
        viteProcess.kill();
    }
    
    console.log('🚀 Starting Vite dev server...');
    viteProcess = spawn('npx', ['vite'], {
        cwd: rootDir,
        stdio: 'inherit'
    });
}

// Initial build
console.log('🏗️  Initial build...');
await runBuild();

// Start Vite server
startViteServer();

// Watch for changes
console.log('👀 Watching for changes in src/ directory...');
const watcher = chokidar.watch(['src/**/*', 'assets/**/*'], {
    ignored: /node_modules/,
    persistent: true,
    cwd: rootDir
});

watcher.on('change', async (filePath) => {
    console.log(`📝 File changed: ${filePath}`);
    await runBuild();
});

watcher.on('add', async (filePath) => {
    console.log(`➕ File added: ${filePath}`);
    await runBuild();
});

watcher.on('unlink', async (filePath) => {
    console.log(`🗑️  File deleted: ${filePath}`);
    await runBuild();
});

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down...');
    if (viteProcess) {
        viteProcess.kill();
    }
    watcher.close();
    process.exit(0);
});

console.log('✨ Development server is running with auto-rebuild!');
console.log('📝 Edit files in src/ or assets/ to see changes');
console.log('🌐 Open http://localhost:3000 in your browser');
console.log('⏹️  Press Ctrl+C to stop');