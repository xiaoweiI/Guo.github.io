// Typing effect for hero text
document.addEventListener('DOMContentLoaded', function() {
    // Get the elements that will have the typing effect
    const helloTextElement = document.querySelector('.hero-content h1 span[data-i18n="hero_hello"]');
    const nameElement = document.querySelector('.hero-content h1 .highlight');
    
    // Store original text content for both languages
    const originalTexts = {
        en: {
            hello: "Hello, I'm Xiaowei"
        },
        zh: {
            hello: "你好，我是Xiaowei"
        }
    };
    
    // Function to create typing effect
    function typeText(text, speed) {
        // Clear both elements first
        helloTextElement.textContent = '';
        nameElement.textContent = '';
        
        // Split the text at the name part
        let parts;
        if (text.includes("Xiaowei")) {
            parts = text.split("Xiaowei");
            parts[1] = "Xiaowei";
        } else {
            parts = [text, ""];
        }
        
        let fullText = parts[0] + parts[1];
        let currentPosition = 0;
        
        const interval = setInterval(function() {
            if (currentPosition < fullText.length) {
                // Determine which element to update
                if (currentPosition < parts[0].length) {
                    // Add to the hello element
                    helloTextElement.textContent += fullText.charAt(currentPosition);
                } else {
                    // First character of name - clear the hello element of any trailing space
                    if (currentPosition === parts[0].length) {
                        helloTextElement.textContent = parts[0].trim();
                    }
                    // Add to the name element
                    nameElement.textContent += fullText.charAt(currentPosition);
                }
                currentPosition++;
            } else {
                clearInterval(interval);
            }
        }, speed);
    }
    
    // Function to start the typing animation
    function startTypingAnimation(lang) {
        // Get the correct text based on language
        const fullText = originalTexts[lang].hello;
        
        // Type the full text with slower speed (150ms between characters)
        typeText(fullText, 150);
    }
    
    // Function to handle page navigation and restart typing effect
    function handlePageChange() {
        // Check if we're on the home page
        if (document.getElementById('home-page').classList.contains('active')) {
            // Get current language
            const currentLang = document.documentElement.getAttribute('lang') || 'en';
            // Start typing animation
            startTypingAnimation(currentLang);
        }
    }
    
    // Listen for page navigation events
    document.querySelectorAll('.nav-links a, .page-nav-btn').forEach(link => {
        link.addEventListener('click', function() {
            // Small delay to ensure page has changed
            setTimeout(handlePageChange, 100);
        });
    });
    
    // Listen for language change
    document.getElementById('langSwitcher').addEventListener('click', function() {
        // Small delay to ensure language has changed
        setTimeout(function() {
            if (document.getElementById('home-page').classList.contains('active')) {
                const currentLang = document.documentElement.getAttribute('lang') || 'en';
                startTypingAnimation(currentLang);
            }
        }, 100);
    });
    
    // Start typing animation on initial load if on home page
    if (document.getElementById('home-page').classList.contains('active')) {
        // Get initial language
        const initialLang = document.documentElement.getAttribute('lang') || 'en';
        // Start with a slight delay to ensure everything is loaded
        setTimeout(function() {
            startTypingAnimation(initialLang);
        }, 500);
    }
    
    // Also restart typing when browser history changes (back/forward buttons)
    window.addEventListener('popstate', function() {
        setTimeout(handlePageChange, 100);
    });
});
