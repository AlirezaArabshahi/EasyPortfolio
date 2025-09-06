#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { build } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// --- Configuration ---
const config = {
    variablesPath: 'src/variables.json',
    components: {
        NAVBAR: 'src/components/AppNavbar.html',
        JOB_POPUP: 'src/components/AppJobPopup.html'
    },
    pages: {
        'index': { contentPath: 'src/pages/PageHome.html', templatePath: 'src/template.html' },
        'about': { contentPath: 'src/pages/PageAbout.html', templatePath: 'src/template.html' },
        'contact': { contentPath: 'src/pages/PageContact.html', templatePath: 'src/template.html' },
        '404': { contentPath: 'src/pages/PageNotFound.html', templatePath: 'src/template.html' }
    },
    outputDir: 'dist',
    tempViteBuildDir: 'temp-vite-build'
};

// --- Helper Functions ---

function replacePlaceholders(content, variables) {
    let output = content;
    for (const [key, value] of Object.entries(variables)) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        output = output.replace(regex, value);
    }
    return output;
}

function getOptimizedAssetPaths(viteBuildDir) {
    const assetPaths = {
        css: [],
        js: []
    };

    if (!fs.existsSync(viteBuildDir)) {
        console.warn('⚠️  Vite build directory not found, using original assets');
        return {
            css: ['assets/css/styles.css', 'assets/css/job-badge.css'],
            js: ['assets/js/router.js', 'assets/js/nav-transition.js', 'assets/js/tetris-animation.js', 'assets/js/job-features.js']
        };
    }

    // Read optimized CSS files only
    const cssDir = path.join(viteBuildDir, 'css');
    if (fs.existsSync(cssDir)) {
        const cssFiles = fs.readdirSync(cssDir)
            .filter(file => file.endsWith('.css'))
            .sort(); // Sort for consistent order
        assetPaths.css = cssFiles.map(file => `assets/css/${file}`);
    }

    // Read optimized JS files only
    const jsDir = path.join(viteBuildDir, 'js');
    if (fs.existsSync(jsDir)) {
        const jsFiles = fs.readdirSync(jsDir)
            .filter(file => file.endsWith('.js'))
            .sort(); // Sort for consistent order
        assetPaths.js = jsFiles.map(file => `assets/js/${file}`);
    }

    return assetPaths;
}

function generateAssetTags(assetPaths) {
    const cssTags = assetPaths.css.map(path => 
        `    <link rel="stylesheet" href="${path}">`
    ).join('\n');
    
    const jsTags = assetPaths.js.map(path => 
        `    <script type="module" src="${path}"></script>`
    ).join('\n');

    return { cssTags, jsTags };
}

function copyOptimizedAssets(viteBuildDir, outputDir) {
    if (!fs.existsSync(viteBuildDir)) {
        console.log('📁 Copying original assets...');
        // Copy original assets if Vite build doesn't exist
        const assetsDir = path.join(outputDir, 'assets');
        if (fs.existsSync('assets')) {
            fs.cpSync('assets', assetsDir, { recursive: true });
        }
        return;
    }

    console.log('📁 Copying optimized assets from Vite build...');
    
    // Ensure output directories exist
    const outputAssetsDir = path.join(outputDir, 'assets');
    fs.mkdirSync(path.join(outputAssetsDir, 'css'), { recursive: true });
    fs.mkdirSync(path.join(outputAssetsDir, 'js'), { recursive: true });

    // Copy optimized CSS files only
    const cssDir = path.join(viteBuildDir, 'css');
    if (fs.existsSync(cssDir)) {
        const cssFiles = fs.readdirSync(cssDir).filter(file => file.endsWith('.css'));
        cssFiles.forEach(file => {
            fs.copyFileSync(
                path.join(cssDir, file),
                path.join(outputAssetsDir, 'css', file)
            );
        });
    }

    // Copy optimized JS files only
    const jsDir = path.join(viteBuildDir, 'js');
    if (fs.existsSync(jsDir)) {
        const jsFiles = fs.readdirSync(jsDir).filter(file => file.endsWith('.js'));
        jsFiles.forEach(file => {
            fs.copyFileSync(
                path.join(jsDir, file),
                path.join(outputAssetsDir, 'js', file)
            );
        });
    }

    // Copy any other static assets (images, fonts, etc.) from original assets folder
    if (fs.existsSync('assets')) {
        const originalAssets = fs.readdirSync('assets', { withFileTypes: true });
        originalAssets.forEach(item => {
            if (item.isDirectory() && !['css', 'js'].includes(item.name)) {
                // Copy non-CSS/JS directories (like images, fonts)
                fs.cpSync(
                    path.join('assets', item.name),
                    path.join(outputAssetsDir, item.name),
                    { recursive: true }
                );
            } else if (item.isFile() && !['.css', '.js'].some(ext => item.name.endsWith(ext))) {
                // Copy non-CSS/JS files
                fs.copyFileSync(
                    path.join('assets', item.name),
                    path.join(outputAssetsDir, item.name)
                );
            }
        });
    }
}

function buildPage(pageName, pageConfig, allVariables, assetTags) {
    const template = fs.readFileSync(pageConfig.templatePath, 'utf8');
    const rawPageContent = fs.readFileSync(pageConfig.contentPath, 'utf8');

    // First, replace placeholders within the page's own content
    const processedPageContent = replacePlaceholders(rawPageContent, allVariables);

    const finalVariables = {
        ...allVariables,
        CSS_TAGS: assetTags.cssTags,
        JS_TAGS: assetTags.jsTags,
        PAGE_CONTENT: processedPageContent,
        PAGE_TITLE: pageName.charAt(0).toUpperCase() + pageName.slice(1)
    };

    // Then, replace placeholders in the main template
    const finalOutput = replacePlaceholders(template, finalVariables);
    const outputPath = path.join(config.outputDir, `${pageName}.html`);

    fs.writeFileSync(outputPath, finalOutput);
    console.log(`✅ File ${pageName}.html has been created!`);
}

async function buildWithVite() {
    try {
        console.log('🔧 Building assets with Vite...');
        await build({
            configFile: path.resolve(rootDir, 'vite.config.js'),
            mode: 'production'
        });
        console.log('✅ Vite build completed!');
        return true;
    } catch (error) {
        console.warn('⚠️  Vite build failed, falling back to original assets:', error.message);
        return false;
    }
}

function cleanupTempFiles() {
    if (fs.existsSync(config.tempViteBuildDir)) {
        fs.rmSync(config.tempViteBuildDir, { recursive: true, force: true });
        console.log('🧹 Cleaned up temporary build files');
    }
}

// --- Main Build Process ---

async function main() {
    try {
        console.log('🚀 Starting hybrid build process...\n');

        // Ensure output directory exists
        fs.mkdirSync(config.outputDir, { recursive: true });

        // Step 1: Build assets with Vite (optional, falls back gracefully)
        const viteSuccess = await buildWithVite();

        // Step 2: Get asset paths (optimized or original)
        const assetPaths = getOptimizedAssetPaths(config.tempViteBuildDir);
        const assetTags = generateAssetTags(assetPaths);

        // Step 3: Copy assets to output directory
        copyOptimizedAssets(config.tempViteBuildDir, config.outputDir);

        // Step 4: Process variables and components
        const rawVariables = JSON.parse(fs.readFileSync(config.variablesPath, 'utf8'));
        const skillsHtml = rawVariables.SKILLS.map(skill => `<span class="skill">${skill}</span>`).join('\n                ');

        const components = {};
        for (const [key, path] of Object.entries(config.components)) {
            const componentContent = fs.readFileSync(path, 'utf8');
            components[key] = replacePlaceholders(componentContent, rawVariables);
        }

        const allVariables = {
            ...rawVariables,
            ...components,
            SKILLS_HTML: skillsHtml
        };

        // Step 5: Generate HTML pages
        console.log('\n📄 Generating HTML pages...');
        for (const [pageName, pageConfig] of Object.entries(config.pages)) {
            buildPage(pageName, pageConfig, allVariables, assetTags);
        }

        // Step 6: Cleanup
        cleanupTempFiles();

        console.log('\n🎉 Hybrid build completed successfully!');
        console.log(`📦 Output directory: ${config.outputDir}`);
        
        if (viteSuccess) {
            console.log('✨ Assets were optimized with Vite');
        } else {
            console.log('📁 Using original assets (Vite optimization skipped)');
        }

    } catch (error) {
        console.error('❌ An error occurred during the build process:', error);
        cleanupTempFiles();
        process.exit(1);
    }
}

main();