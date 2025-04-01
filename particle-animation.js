// Dynamic Particle Animation for Game Developer Portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize on the home page
    const homePage = document.getElementById('home-page');
    if (!homePage) return;
    
    // Load particles.js library if not already loaded
    if (typeof particlesJS === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.onload = initParticles;
        document.body.appendChild(script);
    } else {
        initParticles();
    }
    
    function initParticles() {
        // Create particles container
        const particlesContainer = document.createElement('div');
        particlesContainer.id = 'particles-js';
        particlesContainer.style.position = 'fixed';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.zIndex = '-1';
        particlesContainer.style.background = 'transparent';
        
        // Add container to the hero section
        const heroSection = homePage.querySelector('.hero');
        if (heroSection) {
            heroSection.insertBefore(particlesContainer, heroSection.firstChild);
            
            // Ensure hero content is positioned properly
            const heroContent = heroSection.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.position = 'relative';
            }
        }
        
        // Initialize particles.js
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: { 
                    value: '#6c5ce7' 
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.3,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: { 
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#a29bfe',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
});
