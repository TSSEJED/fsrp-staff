document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const pdfEmbed = document.getElementById('pdf-embed');
    const pdfIframe = document.getElementById('pdf-iframe');
    const currentDocumentTitle = document.getElementById('current-document-title');
    const themeToggle = document.querySelector('.theme-toggle');
    const closeButton = document.getElementById('close-pdf');
    const viewButtons = document.querySelectorAll('.view-btn');
    const quickAccessButtons = document.querySelectorAll('.quick-access-btn');
    const fullTrainingBtn = document.getElementById('full-training-btn');
    const warningPolicyBtn = document.getElementById('warning-policy-btn');
    const joinGameBtn = document.getElementById('join-game-btn');
    
    // Theme Management
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const toggleBall = document.querySelector('.toggle-ball');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            toggleBall.style.transform = 'translateX(30px)';
        } else {
            toggleBall.style.transform = 'translateX(0)';
        }
    }
    
    // Initialize theme
    initTheme();
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        
        // Update the toggle ball position
        const toggleBall = document.querySelector('.toggle-ball');
        if (document.body.classList.contains('dark-mode')) {
            toggleBall.style.transform = 'translateX(30px)';
        } else {
            toggleBall.style.transform = 'translateX(0)';
        }
    });
    
    // Check if device is mobile
    function isMobileDevice() {
        return (window.innerWidth <= 768) || 
               (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    }
    
    // Helper function to resolve relative PDF paths to absolute URLs
    function getAbsolutePdfPath(relativePath) {
        // Get the base URL of the current page (without the filename)
        const baseUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);
        
        // If the path starts with '../', go up one directory
        if (relativePath.startsWith('../')) {
            // Remove the '../' and go up one directory in the baseUrl
            const parentBaseUrl = baseUrl.substring(0, baseUrl.slice(0, -1).lastIndexOf('/') + 1);
            return parentBaseUrl + relativePath.substring(3);
        }
        
        // Otherwise, just join the base URL and the relative path
        return baseUrl + relativePath;
    }
    
    // PDF Viewing Functions
    function openPdfViewer(pdfUrl, title) {
        // Get the absolute path to the PDF
        const absolutePdfUrl = getAbsolutePdfPath(pdfUrl);
        
        // For mobile devices, open PDF directly in a new tab
        if (isMobileDevice()) {
            window.open(absolutePdfUrl, '_blank');
            return;
        }
        
        // For desktop devices, continue with the embedded viewer
        // Set the title in the viewer
        currentDocumentTitle.textContent = title;
        
        // Show the PDF viewer
        pdfEmbed.classList.remove('hidden');
        
        // Set iframe source to the PDF
        pdfIframe.src = pdfUrl; // Use relative path for iframe to avoid cross-origin issues
        
        console.log('Opening PDF:', absolutePdfUrl);
    }

    // Add click listeners to view buttons
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pdfUrl = button.getAttribute('data-pdf');
            const title = button.getAttribute('data-title');
            
            if (pdfUrl && title) {
                openPdfViewer(pdfUrl, title);
            }
        });
    });
    
    // Close PDF viewer
    closeButton.addEventListener('click', () => {
        pdfEmbed.classList.add('hidden');
        pdfIframe.src = '';
    });
    
    // Quick access buttons
    fullTrainingBtn.addEventListener('click', () => {
        const pdfUrl = fullTrainingBtn.getAttribute('data-pdf');
        const title = fullTrainingBtn.getAttribute('data-title');
        if (pdfUrl && title) {
            openPdfViewer(pdfUrl, title);
        }
    });
    
    warningPolicyBtn.addEventListener('click', () => {
        const pdfUrl = warningPolicyBtn.getAttribute('data-pdf');
        const title = warningPolicyBtn.getAttribute('data-title');
        if (pdfUrl && title) {
            openPdfViewer(pdfUrl, title);
        }
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (pdfEmbed.classList.contains('hidden')) return;
        
        if (e.key === 'Escape') {
            pdfEmbed.classList.add('hidden');
            pdfIframe.src = '';
        }
    });

    // Join Game button functionality
    joinGameBtn.addEventListener('click', () => {
        window.open('https://policeroleplay.community/join/AebBj', '_blank');
    });

    // Console Branding
    console.log('%cFSRP Trainers Portal', 'color: #3a86ff; font-size: 20px; font-weight: bold;');
    console.log('%cDesigned by Sejed TRABELLSSI | sejed.pages.dev', 'color: #8338ec; font-size: 12px;');
    
    // Disable right-click
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Disable keyboard shortcuts for saving, printing, etc.
    document.addEventListener('keydown', function(e) {
        // Prevent Ctrl+S, Ctrl+P, Ctrl+Shift+I
        if ((e.ctrlKey && e.key === 's') || 
            (e.ctrlKey && e.key === 'p') || 
            (e.ctrlKey && e.shiftKey && e.key === 'i')) {
            e.preventDefault();
            return false;
        }
    });
});
