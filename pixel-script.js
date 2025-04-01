// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Page Navigation System
    const pages = {
        'home': document.getElementById('home-page'),
        'about': document.getElementById('about-page'),
        'games': document.getElementById('games-page'),
        'archive': document.getElementById('archive-page'),
        'skills': document.getElementById('skills-page'),
        'contact': document.getElementById('contact-page')
    };
    
    // Set home page as active by default
    let currentPage = 'home';
    
    // Function to navigate to a page
    function navigateTo(pageId) {
        // Hide all pages
        Object.values(pages).forEach(page => {
            if (page) page.classList.remove('active');
        });
        
        // Show the selected page
        if (pages[pageId]) {
            pages[pageId].classList.add('active');
            currentPage = pageId;
            
            // Scroll to top when changing pages
            window.scrollTo(0, 0);
            
            // Update URL hash without scrolling
            history.pushState(null, null, `#${pageId}`);
            
            // Create floating pixel boxes for the current page
            createFloatingBoxes();
        }
    }
    
    // Set up navigation event listeners
    document.querySelectorAll('.nav-links a, .page-nav-btn').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            if (pageId) {
                navigateTo(pageId);
            }
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const pageId = window.location.hash.substring(1) || 'home';
        navigateTo(pageId);
    });
    
    // Initialize based on URL hash or default to home
    const initialPage = window.location.hash.substring(1) || 'home';
    navigateTo(initialPage);
    
    // Floating Pixel Boxes
    function createFloatingBoxes() {
        // Remove any existing floating boxes
        document.querySelectorAll('.pixel-box').forEach(box => box.remove());
        
        // Create new floating boxes for the current page
        const currentPageElement = pages[currentPage];
        if (!currentPageElement) return;
        
        const boxContents = [
            '<i class="fas fa-gamepad"></i>',
            '<i class="fas fa-code"></i>',
            '<i class="fas fa-palette"></i>',
            '<i class="fas fa-star"></i>'
        ];
        
        for (let i = 0; i < 4; i++) {
            const box = document.createElement('div');
            box.className = `pixel-box pixel-border pixel-box-${i+1}`;
            box.innerHTML = boxContents[i];
            currentPageElement.appendChild(box);
        }
    }
    
    // Language translations (from original script.js)
    const translations = {
        en: {
            // Navigation
            "nav_home": "Home",
            "nav_about": "About",
            "nav_games": "Game Portfolio",
            "nav_archive": "Archive",
            "nav_skills": "Skills",
            "nav_contact": "Contact",
            
            // Hero section
            "hero_hello": "Hello, I'm",
            "hero_title": "Game Developer & Designer",
            "hero_welcome": "Welcome to my personal portfolio website showcasing my work and passion for game development.",
            "hero_view_work": "View My Work",
            "hero_contact": "Contact Me",
            
            // About section
            "about_title": "About Me",
            "about_p1": "Hello! I'm a passionate game developer with a strong background in both design and programming. I love creating immersive experiences that engage players and tell compelling stories.",
            "about_p2": "With several years of experience in the gaming industry, I've worked on a variety of projects ranging from mobile games to PC titles. My expertise includes game mechanics design, level design, and implementing engaging gameplay systems.",
            "about_p3": "When I'm not coding or designing games, you can find me exploring new game releases, participating in game jams, or experimenting with new technologies and tools in the game development space.",
            "info_name": "Name:",
            "info_email": "Email:",
            "info_location": "Location:",
            "info_experience": "Experience:",
            "experience_years": "5+ Years",
            
            // Game Portfolio section
            "games_title": "Game Portfolio",
            "filter_all": "All",
            "filter_pc": "PC Games",
            "filter_board": "Board Games",
            "filter_jam": "Game Jam",
            
            // Archive section
            "archive_title": "Other Archive",
            "archive_gdd": "Game Design Documents",
            "archive_art": "Art & Concept Work",
            "archive_publications": "Publications & Talks",
            "archive_view": "View",
            
            // Skills section
            "skills_title": "Skills & Expertise",
            "skills_p1": "I've developed a diverse set of skills throughout my career in game development. Below you can see my proficiency in various technologies and disciplines relevant to game creation.",
            "skills_p2": "Click on any skill to see more details about my experience with that technology or discipline.",
            "skills_demo": "Interactive Skill Demo",
            "skills_start": "Start Demo",
            "skills_reset": "Reset",
            
            // Contact section
            "contact_title": "Contact Me",
            "contact_email": "Email",
            "contact_phone": "Phone",
            "contact_location": "Location",
            "contact_name": "Name",
            "contact_subject": "Subject",
            "contact_message": "Message",
            "contact_send": "Send Message",
            
            // Footer
            "footer_dev": "Game Developer & Designer",
            "footer_rights": "All Rights Reserved.",
            
            // Navigation buttons
            "nav_prev": "Previous",
            "nav_next": "Next"
        },
        zh: {
            // Navigation
            "nav_home": "首页",
            "nav_about": "关于我",
            "nav_games": "游戏作品",
            "nav_archive": "档案",
            "nav_skills": "技能",
            "nav_contact": "联系方式",
            
            // Hero section
            "hero_hello": "你好，我是",
            "hero_title": "游戏开发者 & 设计师",
            "hero_welcome": "欢迎来到我的个人作品集网站，这里展示了我的作品和对游戏开发的热情。",
            "hero_view_work": "查看作品",
            "hero_contact": "联系我",
            
            // About section
            "about_title": "关于我",
            "about_p1": "你好！我是一位热情的游戏开发者，在设计和编程方面都有扎实的背景。我喜欢创造能够吸引玩家并讲述引人入胜故事的沉浸式体验。",
            "about_p2": "凭借在游戏行业多年的经验，我参与过从手机游戏到PC游戏的各种项目。我的专长包括游戏机制设计、关卡设计和实现引人入胜的游戏系统。",
            "about_p3": "当我不在编码或设计游戏时，你可以看到我在探索新游戏发布、参与游戏开发马拉松，或者在游戏开发领域尝试新技术和工具。",
            "info_name": "姓名：",
            "info_email": "邮箱：",
            "info_location": "地点：",
            "info_experience": "经验：",
            "experience_years": "5年以上",
            
            // Game Portfolio section
            "games_title": "游戏作品集",
            "filter_all": "全部",
            "filter_pc": "PC游戏",
            "filter_board": "桌游",
            "filter_jam": "游戏马拉松",
            
            // Archive section
            "archive_title": "其他档案",
            "archive_gdd": "游戏设计文档",
            "archive_art": "艺术与概念作品",
            "archive_publications": "出版物与演讲",
            "archive_view": "查看",
            
            // Skills section
            "skills_title": "技能与专长",
            "skills_p1": "在我的游戏开发职业生涯中，我培养了多样化的技能。以下是我在与游戏创作相关的各种技术和学科中的熟练程度。",
            "skills_p2": "点击任何技能，查看有关我在该技术或学科方面的经验的更多详细信息。",
            "skills_demo": "互动技能演示",
            "skills_start": "开始演示",
            "skills_reset": "重置",
            
            // Contact section
            "contact_title": "联系我",
            "contact_email": "邮箱",
            "contact_phone": "电话",
            "contact_location": "地点",
            "contact_name": "姓名",
            "contact_subject": "主题",
            "contact_message": "留言",
            "contact_send": "发送留言",
            
            // Footer
            "footer_dev": "游戏开发者 & 设计师",
            "footer_rights": "版权所有。",
            
            // Navigation buttons
            "nav_prev": "上一页",
            "nav_next": "下一页"
        }
    };
    
    // Current language (default: English)
    let currentLang = 'en';
    
    // Function to update text content based on selected language
    function updateLanguage(lang) {
        currentLang = lang;
        
        // Update language attribute on html tag
        document.documentElement.setAttribute('lang', lang);
        
        // Update language switcher button text
        const langBtn = document.getElementById('langSwitcher');
        if (langBtn) {
            langBtn.textContent = lang === 'en' ? '中文' : 'English';
        }
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        // Save language preference to localStorage
        localStorage.setItem('preferredLanguage', lang);
    }
    
    // Language switcher button click event
    document.getElementById('langSwitcher').addEventListener('click', function() {
        const newLang = currentLang === 'en' ? 'zh' : 'en';
        updateLanguage(newLang);
    });
    
    // Initialize language based on localStorage or browser preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && (savedLang === 'en' || savedLang === 'zh')) {
        updateLanguage(savedLang);
    } else {
        // Default to English if no preference is saved
        updateLanguage('en');
    }
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Game Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide game cards based on filter
            gameCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else if (card.getAttribute('data-category').includes(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Skill Cards Interaction
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle skill details visibility
            const details = this.querySelector('.skill-details');
            if (details) {
                details.style.opacity = details.style.opacity === '1' ? '0' : '1';
            }
        });
    });

    // Interactive Skill Demo Canvas
    const canvas = document.getElementById('skillCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const startBtn = document.getElementById('startDemo');
        const resetBtn = document.getElementById('resetDemo');
        
        // Define particles array and animation variables
        let particles = [];
        let animationId;
        let isAnimating = false;
        
        // Particle class
        class Particle {
            constructor(x, y, size, color, speedX, speedY) {
                this.x = x;
                this.y = y;
                this.size = size;
                this.color = color;
                this.speedX = speedX;
                this.speedY = speedY;
                this.alpha = 1;
            }
            
            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Bounce off walls
                if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                    this.speedX = -this.speedX;
                }
                
                if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                    this.speedY = -this.speedY;
                }
                
                // Fade out slowly
                this.alpha -= 0.002;
                
                this.draw();
            }
        }
        
        // Initialize canvas
        function initCanvas() {
            ctx.fillStyle = '#f5f6fa';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw text
            ctx.fillStyle = '#9376e0';
            ctx.font = '16px "Press Start 2P"';
            ctx.textAlign = 'center';
            ctx.fillText('Click Start Demo', canvas.width / 2, canvas.height / 2 - 10);
            ctx.fillText('to see skills in action!', canvas.width / 2, canvas.height / 2 + 20);
        }
        
        // Create particles
        function createParticles() {
            const skillNames = ['Unity', 'Unreal', '3D', 'Design', 'Code', 'Art'];
            const colors = ['#5f85db', '#9376e0', '#ff9eaa', '#5f85db', '#9376e0', '#ff9eaa'];
            
            for (let i = 0; i < 50; i++) {
                const size = Math.random() * 20 + 5;
                const x = Math.random() * (canvas.width - size * 2) + size;
                const y = Math.random() * (canvas.height - size * 2) + size;
                const speedX = (Math.random() - 0.5) * 3;
                const speedY = (Math.random() - 0.5) * 3;
                const colorIndex = Math.floor(Math.random() * colors.length);
                
                particles.push(new Particle(x, y, size, colors[colorIndex], speedX, speedY));
                
                // Add text to some particles
                if (i % 8 === 0) {
                    const textParticle = new Particle(x, y, 30, colors[colorIndex], speedX * 0.5, speedY * 0.5);
                    textParticle.text = skillNames[i % skillNames.length];
                    textParticle.draw = function() {
                        ctx.save();
                        ctx.globalAlpha = this.alpha;
                        ctx.fillStyle = this.color;
                        ctx.font = '16px "Press Start 2P"';
                        ctx.textAlign = 'center';
                        ctx.fillText(this.text, this.x, this.y);
                        ctx.restore();
                    };
                    particles.push(textParticle);
                }
            }
        }
        
        // Animate particles
        function animate() {
            ctx.fillStyle = 'rgba(245, 246, 250, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                
                // Remove particles with low alpha
                if (particles[i].alpha <= 0) {
                    particles.splice(i, 1);
                    i--;
                }
            }
            
            // Add new particles if needed
            if (particles.length < 10 && isAnimating) {
                createParticles();
            }
            
            if (isAnimating) {
                animationId = requestAnimationFrame(animate);
            }
        }
        
        // Start demo button
        if (startBtn) {
            startBtn.addEventListener('click', function() {
                if (!isAnimating) {
                    isAnimating = true;
                    particles = [];
                    createParticles();
                    animate();
                    this.textContent = currentLang === 'en' ? 'Pause Demo' : '暂停演示';
                } else {
                    isAnimating = false;
                    cancelAnimationFrame(animationId);
                    this.textContent = currentLang === 'en' ? 'Start Demo' : '开始演示';
                }
            });
        }
        
        // Reset demo button
        if (resetBtn) {
            resetBtn.addEventListener('click', function() {
                isAnimating = false;
                if (startBtn) startBtn.textContent = currentLang === 'en' ? 'Start Demo' : '开始演示';
                cancelAnimationFrame(animationId);
                particles = [];
                initCanvas();
            });
        }
        
        // Initialize canvas on load
        initCanvas();
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (name === '' || email === '' || subject === '' || message === '') {
                alert(currentLang === 'en' ? 'Please fill in all fields' : '请填写所有字段');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert(currentLang === 'en' ? 'Please enter a valid email address' : '请输入有效的电子邮件地址');
                return;
            }
            
            // If validation passes, show success message
            // In a real application, you would send the form data to a server here
            alert(currentLang === 'en' ? 'Thank you for your message! I will get back to you soon.' : '感谢您的留言！我会尽快回复您。');
            contactForm.reset();
        });
    }

    // Pixel Art Effect for Images
    document.querySelectorAll('.image-placeholder').forEach(placeholder => {
        placeholder.classList.add('pixel-border');
    });
    
    // Create initial floating boxes
    createFloatingBoxes();
});
