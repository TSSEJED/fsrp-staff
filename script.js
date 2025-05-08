document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeToggle = document.querySelector('.theme-toggle');
    const viewButtons = document.querySelectorAll('.view-btn');
    const pdfEmbed = document.getElementById('pdf-embed');
    const pdfIframe = document.getElementById('pdf-iframe');
    const closePdfBtn = document.getElementById('close-pdf');
    const currentDocumentTitle = document.getElementById('current-document-title');
    const warningPolicyBtn = document.getElementById('warning-policy-btn');
    const restrictedDocBtn = document.getElementById('restricted-doc-btn');
    const joinGameBtn = document.getElementById('join-game-btn');
    
    // Access Popup Elements
    const accessPopup = document.getElementById('access-popup');
    const accessCodeInput = document.getElementById('access-code');
    const submitCodeBtn = document.getElementById('submit-code');
    const openDiscordBtn = document.getElementById('open-discord');
    const closePopupBtn = document.getElementById('close-popup');
    
    // Theme Management
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
        }
    }
    
    // Initialize theme
    initTheme();
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
    
    // Add click listeners to view buttons
    viewButtons.forEach(button => {
        if (!button.classList.contains('restricted')) {
            button.addEventListener('click', () => {
                const pdfUrl = button.getAttribute('data-pdf');
                const title = button.getAttribute('data-title');
                if (pdfUrl && title) {
                    openPdfViewer(pdfUrl, title);
                }
            });
        }
    });
    
    // Close PDF viewer
    closePdfBtn.addEventListener('click', () => {
        pdfEmbed.classList.add('hidden');
        pdfIframe.src = '';
    });
    
    // Warning Policy button in quick access menu
    warningPolicyBtn.addEventListener('click', () => {
        const pdfUrl = warningPolicyBtn.getAttribute('data-pdf');
        const title = warningPolicyBtn.getAttribute('data-title');
        if (pdfUrl && title) {
            openPdfViewer(pdfUrl, title);
        }
    });
    
    // Restricted document button
    restrictedDocBtn.addEventListener('click', () => {
        showAccessPopup();
    });
    
    // Function to open PDF viewer
    function openPdfViewer(pdfUrl, title) {
        // Set the iframe source to the PDF URL
        pdfIframe.src = pdfUrl;
        
        // Set the title in the viewer
        currentDocumentTitle.textContent = title;
        
        // Show the PDF viewer
        pdfEmbed.classList.remove('hidden');
        
        console.log('Opening PDF:', pdfUrl);
    }
    
    // Function to show access popup
    function showAccessPopup() {
        accessPopup.classList.remove('hidden');
        accessCodeInput.focus();
    }
    
    // Join Game button functionality
    joinGameBtn.addEventListener('click', () => {
        window.open('https://policeroleplay.community/join/AebBj', '_blank');
    });
    
    // Access code popup functionality
    submitCodeBtn.addEventListener('click', () => {
        const code = accessCodeInput.value.trim();
        if (code === 'sejed') {
            accessPopup.classList.add('hidden');
            openPdfViewer('../Full staff training document.pdf', 'Full Staff Training Document');
            accessCodeInput.value = '';
        } else {
            alert('Invalid access code. Please try again or open a Discord ticket.');
        }
    });
    
    // Enter key for access code
    accessCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitCodeBtn.click();
        }
    });
    
    // Open Discord button
    openDiscordBtn.addEventListener('click', () => {
        window.open('https://discord.gg/yaprqtp3V3', '_blank');
    });
    
    // Close popup button
    closePopupBtn.addEventListener('click', () => {
        accessPopup.classList.add('hidden');
        accessCodeInput.value = '';
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (pdfEmbed.classList.contains('hidden')) return;
        
        if (e.key === 'Escape') {
            pdfEmbed.classList.add('hidden');
            pdfIframe.src = '';
        }
        
        // Prevent Ctrl+S, Ctrl+P, Ctrl+Shift+I
        if ((e.ctrlKey && e.key === 's') || 
            (e.ctrlKey && e.key === 'p') || 
            (e.ctrlKey && e.shiftKey && e.key === 'i')) {
            e.preventDefault();
            return false;
        }
    });
    
    // Disable right-click
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // This is a client-side check only and should be supplemented with server-side validation in a production environment
    const fullTrainingLinks = document.querySelectorAll('a[href*="Full staff training"]');
    fullTrainingLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Access denied. You do not have permission to view this document.');
        });
    });
    // Console Branding
    console.log('%cFSRP Staff Portal', 'color: #f44336; font-size: 20px; font-weight: bold;');
    console.log('%cDesigned by Sejed TRABELLSSI | sejed.pages.dev', 'color: #ff9800; font-size: 12px;');
});
