// Job Seeking Features
class JobFeatures {
    constructor() {
        this.init();
    }

    init() {
        // Ensure banner starts hidden
        const banner = document.getElementById('jobBanner');
        if (banner) {
            banner.classList.remove('show');
        }

        // Show banner after 3 seconds
        setTimeout(() => {
            this.showJobBanner();
        }, 3000);

        // Auto-hide banner after 8 seconds
        setTimeout(() => {
            this.closeJobBanner();
        }, 11000);
    }

    showJobBanner() {
        const banner = document.getElementById('jobBanner');
        if (banner) {
            banner.classList.add('show');
        }
    }
}

// Global functions for HTML onclick events
function toggleJobPopup() {
    const popup = document.getElementById('jobPopup');
    const badge = document.getElementById('jobBadge');
    
    if (popup.classList.contains('show')) {
        closeJobPopup();
    } else {
        popup.classList.add('show');
        badge.style.transform = 'scale(0.95)';
        
        // Track interaction
        console.log('Job popup opened - user interested!');
    }
}

function closeJobPopup() {
    const popup = document.getElementById('jobPopup');
    const badge = document.getElementById('jobBadge');
    
    popup.classList.remove('show');
    badge.style.transform = 'scale(1)';
}

function closeJobBanner() {
    const banner = document.getElementById('jobBanner');
    if (banner) {
        banner.classList.remove('show');
    }
}

// --- EXPOSE FUNCTIONS TO GLOBAL SCOPE ---
window.toggleJobPopup = toggleJobPopup;
window.closeJobPopup = closeJobPopup;
window.closeJobBanner = closeJobBanner;


// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new JobFeatures();
    
    // Close popup when clicking outside
    document.addEventListener('click', (e) => {
        const popup = document.getElementById('jobPopup');
        const badge = document.getElementById('jobBadge');
        
        if (popup.classList.contains('show') && 
            !popup.contains(e.target) && 
            !badge.contains(e.target)) {
            closeJobPopup();
        }
    });
});