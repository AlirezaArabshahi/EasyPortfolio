# Design Document

## Overview

این document طراحی refactoring پروژه personal website را شرح می‌دهد. هدف اصلی تبدیل پروژه فعلی به یک codebase تمیز، maintainable و modern است که از best practices استفاده کند و برای open source آماده باشد.

## Architecture

### Current Architecture Issues
- Build system ساده و محدود
- Flat file structure بدون logical grouping
- Monolithic CSS file
- عدم استفاده از ES6 modules
- Manual asset management

### Build Tool Options Analysis

**Option 1: Keep Current Node.js Script (Improved)**
- ✅ Simple and lightweight
- ✅ No external dependencies
- ✅ Generates static HTML files
- ❌ No hot reload during development
- ❌ No automatic asset optimization
- ❌ Manual CSS/JS concatenation
- ❌ No modern JavaScript features support

**Option 2: Vite Build Tool**
- ✅ Fast development server with hot reload
- ✅ Automatic asset optimization
- ✅ ES6 modules support
- ✅ CSS preprocessing capabilities
- ✅ Tree shaking and code splitting
- ✅ Can still generate static HTML files
- ❌ Additional dependency

**Option 3: Hybrid Approach (Recommended)**
- Keep template system for static HTML generation
- Use Vite only for development and asset processing
- Best of both worlds

### Proposed Architecture

```
project-root/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── navbar/
│   │   ├── tetris-animation/
│   │   └── job-popup/
│   ├── pages/              # Page-specific content
│   ├── styles/             # CSS organization
│   │   ├── base/           # Reset, variables, typography
│   │   ├── components/     # Component-specific styles
│   │   ├── layouts/        # Layout styles
│   │   └── utilities/      # Utility classes
│   ├── scripts/            # JavaScript modules
│   │   ├── router/
│   │   ├── animations/
│   │   └── utils/
│   ├── assets/             # Static assets
│   └── data/               # JSON data files
├── public/                 # Static files
├── dist/                   # Build output
└── docs/                   # Documentation
```

## Components and Interfaces

### 1. Hybrid Build System

**Development Mode (Vite):**
```javascript
// vite.config.js
export default {
  root: 'src',
  server: {
    port: 3000
  },
  build: {
    outDir: '../temp-dev'
  }
}
```

**Production Mode (Enhanced Node.js Script):**
```javascript
// scripts/build.js
import { build } from 'vite';

// 1. Use Vite to process and optimize assets
await build({
  build: {
    outDir: 'temp-assets',
    rollupOptions: {
      input: ['src/styles/main.css', 'src/scripts/main.js']
    }
  }
});

// 2. Use existing template system to generate HTML files
generateStaticPages();

// 3. Copy optimized assets to final output
copyOptimizedAssets();
```

**Benefits:**
- ✅ Fast development with hot reload
- ✅ Asset optimization for production
- ✅ Still generates static HTML files
- ✅ No runtime dependencies
- ✅ GitHub Pages compatible

**Responsibilities:**
- Development: Hot module replacement, live preview
- Production: Asset optimization, static file generation

### 2. Component System

**Base Component Interface:**
```javascript
class Component {
  constructor(element, options = {}) {
    this.element = element;
    this.options = options;
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.render();
  }
  
  bindEvents() {}
  render() {}
  destroy() {}
}
```

**Components:**
- `NavbarComponent`: Navigation handling
- `TetrisAnimationComponent`: Canvas animation
- `RouterComponent`: Client-side routing
- `JobPopupComponent`: Job availability popup

### 3. CSS Architecture (BEM Methodology)

**Structure:**
```scss
// Base layer
@import 'base/reset';
@import 'base/variables';
@import 'base/typography';

// Component layer
@import 'components/navbar';
@import 'components/tetris-animation';
@import 'components/job-popup';

// Layout layer
@import 'layouts/main';
@import 'layouts/grid';

// Utility layer
@import 'utilities/spacing';
@import 'utilities/colors';
```

**CSS Custom Properties:**
```css
:root {
  --color-primary: #4a90e2;
  --color-background: #000;
  --color-text: #fff;
  --font-family-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --spacing-unit: 1rem;
  --border-radius: 6px;
}
```

### 4. Module System

**Router Module:**
```javascript
// src/scripts/router/Router.js
export class Router {
  constructor(routes) {
    this.routes = routes;
    this.init();
  }
  // Implementation
}

// src/scripts/router/index.js
export { Router } from './Router.js';
export { Route } from './Route.js';
```

**Animation Module:**
```javascript
// src/scripts/animations/TetrisAnimation.js
export class TetrisAnimation {
  constructor(canvas, options) {
    this.canvas = canvas;
    this.options = options;
  }
  // Implementation
}
```

## Data Models

### 1. Site Configuration
```javascript
// src/data/site-config.json
{
  "site": {
    "title": "Alireza Arabshahi",
    "description": "Software Engineer specializing in .NET & JavaScript",
    "url": "https://alirezaarabshahi.github.io"
  },
  "author": {
    "name": "Alireza Arabshahi",
    "title": "Software Engineer",
    "location": "Tehran, Iran",
    "skills": ["C#", "JavaScript", "ASP.NET Core", "Vue.js", "Blazor"]
  },
  "social": {
    "github": "https://github.com/alirezaarabshahi",
    "linkedin": "https://www.linkedin.com/in/alirezaarabshahi",
    "email": "arabshahii.alireza@gmail.com"
  }
}
```

### 2. Page Content Model
```javascript
// src/data/pages/home.json
{
  "meta": {
    "title": "Home",
    "description": "Personal website of Alireza Arabshahi"
  },
  "content": {
    "hero": {
      "title": "Alireza Arabshahi",
      "subtitle": "Software Engineer | Building Scalable Applications",
      "description": "I am a software engineer specializing in..."
    }
  }
}
```

### 3. Component Configuration
```javascript
// src/data/components/tetris-config.json
{
  "animation": {
    "blockSize": 20,
    "fallSpeed": 2,
    "colors": ["#4a90e2", "#50c878", "#ff6b6b"],
    "texts": ["C#", "JS", ".NET", "Vue", "API"]
  }
}
```

## Error Handling

### 1. Global Error Handler
```javascript
// src/scripts/utils/ErrorHandler.js
export class ErrorHandler {
  static init() {
    window.addEventListener('error', this.handleError);
    window.addEventListener('unhandledrejection', this.handlePromiseRejection);
  }
  
  static handleError(event) {
    console.error('Global error:', event.error);
    // Send to analytics or logging service
  }
  
  static handlePromiseRejection(event) {
    console.error('Unhandled promise rejection:', event.reason);
  }
}
```

### 2. Component Error Boundaries
```javascript
// src/scripts/components/BaseComponent.js
export class BaseComponent {
  constructor(element, options = {}) {
    try {
      this.element = element;
      this.options = options;
      this.init();
    } catch (error) {
      this.handleError(error);
    }
  }
  
  handleError(error) {
    console.error(`Error in ${this.constructor.name}:`, error);
    this.element.innerHTML = '<p>Something went wrong. Please refresh the page.</p>';
  }
}
```

### 3. Network Error Handling
```javascript
// src/scripts/utils/ApiClient.js
export class ApiClient {
  static async fetch(url, options = {}) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response;
    } catch (error) {
      if (error.name === 'TypeError') {
        throw new Error('Network error. Please check your connection.');
      }
      throw error;
    }
  }
}
```

## Testing Strategy

### 1. Unit Testing (Jest)
```javascript
// tests/unit/Router.test.js
import { Router } from '../../src/scripts/router/Router.js';

describe('Router', () => {
  test('should navigate to correct page', () => {
    const router = new Router({
      'home': '/index.html',
      'about': '/about.html'
    });
    
    router.navigateTo('about');
    expect(window.location.pathname).toBe('/about.html');
  });
});
```

### 2. Integration Testing
```javascript
// tests/integration/navigation.test.js
describe('Navigation Integration', () => {
  test('should update page content when navigating', async () => {
    // Test full navigation flow
  });
});
```

### 3. E2E Testing (Playwright)
```javascript
// tests/e2e/homepage.spec.js
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Alireza Arabshahi');
  await expect(page.locator('.tetris-container')).toBeVisible();
});
```

### 4. Performance Testing
```javascript
// tests/performance/lighthouse.js
import lighthouse from 'lighthouse';

test('performance metrics', async () => {
  const result = await lighthouse('http://localhost:3000');
  expect(result.lhr.categories.performance.score).toBeGreaterThan(0.9);
});
```

### 5. Accessibility Testing
```javascript
// tests/accessibility/a11y.test.js
import { axe, toHaveNoViolations } from 'jest-axe';

test('should not have accessibility violations', async () => {
  const results = await axe(document.body);
  expect(results).toHaveNoViolations();
});
```

## Build Strategy Comparison

### Current Approach
```bash
npm run build  # Generates: index.html, about.html, contact.html, 404.html
```

### Proposed Hybrid Approach
```bash
# Development
npm run dev    # Vite dev server with hot reload

# Production  
npm run build  # Enhanced script that:
               # 1. Processes assets with Vite
               # 2. Generates static HTML files
               # 3. Outputs same structure as current
```

**Final Output (Same as Current):**
```
dist/
├── index.html
├── about.html  
├── contact.html
├── 404.html
├── assets/
│   ├── css/
│   └── js/
```

## Implementation Phases

### Phase 1: Enhanced Build System
- Improve current Node.js build script
- Add Vite for development mode only
- Maintain static HTML generation

### Phase 2: Code Organization
- Reorganize file structure
- Implement ES6 modules
- Modularize components

### Phase 3: CSS Architecture
- Implement CSS custom properties
- Organize CSS with logical structure
- Improve responsive design

### Phase 4: JavaScript Improvements
- Add proper error handling
- Implement component system
- Optimize performance

### Phase 5: Quality & Documentation
- Add accessibility improvements
- Write comprehensive documentation
- Setup development guidelines