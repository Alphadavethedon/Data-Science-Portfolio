// script.js - Advanced Cyberpunk Theme with Professional Features
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Matrix background effect
    const matrixCanvas = document.getElementById('matrixCanvas');
    if (matrixCanvas) {
        initMatrix(matrixCanvas);
    }
    
    // Tab functionality with animation and history
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId, true);
            
            // Update URL hash without page jump
            history.replaceState(null, null, `#${tabId}`);
        });
    });
    
    // Check URL hash on load
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        if (document.getElementById(hash)) {
            switchTab(hash, false);
        }
    }
    
    // Mobile menu toggle with animation
    const menuToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.cyber-nav ul');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Animate menu items
            const navItems = mainNav.querySelectorAll('li');
            navItems.forEach((item, index) => {
                if (mainNav.classList.contains('active')) {
                    item.style.animation = `fadeInDown 0.3s ${index * 0.1}s forwards`;
                } else {
                    item.style.animation = 'none';
                }
            });
        });
    }
    
    // Enhanced header scroll effect with parallax
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.neon-header');
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Parallax effect
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-parallax'));
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
    
    // Initialize typing effect with error handling
    try {
        initTypingEffect();
    } catch (error) {
        console.error('Typing effect initialization failed:', error);
    }
    
    // Initialize smooth scroll for anchor links
    initSmoothScroll();
    
    // Initialize intersection observer for animations
    initScrollAnimations();
    
    // Initialize tooltips
    initTooltips();
    
    // Debounced resize event for canvas
    window.addEventListener('resize', debounce(() => {
        if (matrixCanvas) {
            matrixCanvas.width = matrixCanvas.offsetWidth;
            matrixCanvas.height = matrixCanvas.offsetHeight;
        }
    }, 250));
});

// Enhanced tab switching with animations
function switchTab(tabId, animate = true) {
    // Get all buttons and tabs
    const buttons = document.querySelectorAll('.tab-button');
    const tabs = document.querySelectorAll('.tab-content');
    
    // Remove active class from all buttons and tabs
    buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    
    tabs.forEach(tab => {
        if (animate) {
            tab.style.opacity = 0;
            tab.style.transform = 'translateY(20px)';
        }
        tab.classList.remove('active');
        tab.setAttribute('aria-hidden', 'true');
    });
    
    // Add active class to clicked button and corresponding tab
    const activeButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
    const activeTab = document.getElementById(tabId);
    
    if (activeButton && activeTab) {
        activeButton.classList.add('active');
        activeButton.setAttribute('aria-selected', 'true');
        
        activeTab.classList.add('active');
        activeTab.setAttribute('aria-hidden', 'false');
        
        if (animate) {
            setTimeout(() => {
                activeTab.style.opacity = 1;
                activeTab.style.transform = 'translateY(0)';
                activeTab.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            }, 50);
        }
    }
}

// Advanced typing effect with error handling and customization
function initTypingEffect() {
    const typingElement = document.querySelector('.typing');
    if (!typingElement) return;
    
    try {
        const strings = JSON.parse(typingElement.getAttribute('data-strings')) || [
            "Cyberpunk",
            "Futuristic",
            "Interactive",
            "Neon Dreams"
        ];
        
        const cursorChar = typingElement.getAttribute('data-cursor') || '|';
        const typingSpeed = parseInt(typingElement.getAttribute('data-speed')) || 100;
        const deletingSpeed = parseInt(typingElement.getAttribute('data-delete-speed')) || 50;
        const pauseTime = parseInt(typingElement.getAttribute('data-pause')) || 1500;
        
        let currentStringIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;
        
        // Create cursor element
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = cursorChar;
        typingElement.appendChild(cursor);
        
        function type() {
            if (isPaused) {
                setTimeout(type, pauseTime);
                isPaused = false;
                return;
            }
            
            const currentString = strings[currentStringIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentString.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentString.substring(0, charIndex + 1);
                charIndex++;
            }
            
            // Add cursor back (it gets removed when we update textContent)
            typingElement.appendChild(cursor);
            
            if (!isDeleting && charIndex === currentString.length) {
                isDeleting = true;
                isPaused = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentStringIndex = (currentStringIndex + 1) % strings.length;
                isPaused = true;
            }
            
            const speed = isDeleting ? deletingSpeed : typingSpeed;
            setTimeout(type, isPaused ? pauseTime : speed);
        }
        
        // Start typing after a delay
        setTimeout(type, 1000);
    } catch (error) {
        console.error('Typing effect error:', error);
        typingElement.textContent = "Interactive Experience";
    }
}

// Professional Matrix Rain Effect
function initMatrix(canvas) {
    if (!canvas) return;
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');
    
    // Matrix characters - katakana for more cyberpunk feel
    const matrixChars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
    const fontSize = 18;
    const columns = canvas.width / fontSize;
    
    // Adjust for high DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.width * dpr;
    canvas.height = canvas.height * dpr;
    ctx.scale(dpr, dpr);
    
    // Create drops for each column
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -canvas.height / fontSize);
    }
    
    // Draw function
    function draw() {
        // Semi-transparent background for trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set style for characters
        ctx.fillStyle = '#0f0'; // Matrix green
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
            
            // Draw character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Reset drop at bottom with random delay
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Move drop down
            drops[i]++;
        }
    }
    
    // Animation loop with requestAnimationFrame
    let animationId;
    function animate() {
        draw();
        animationId = requestAnimationFrame(animate);
    }
    animate();
    
    // Handle canvas resize
    window.addEventListener('resize', () => {
        cancelAnimationFrame(animationId);
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = canvas.offsetHeight * dpr;
        ctx.scale(dpr, dpr);
        animate();
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.replaceState(null, null, targetId);
            }
        });
    });
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animation = entry.target.getAttribute('data-animate');
                    entry.target.style.animation = `${animation} 1s forwards`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        animatedElements.forEach(element => {
            const animation = element.getAttribute('data-animate');
            element.style.animation = `${animation} 1s forwards`;
        });
    }
}

// Tooltip system
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltip = document.createElement('div');
        tooltip.className = 'cyber-tooltip';
        tooltip.textContent = element.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);
        
        element.addEventListener('mouseenter', (e) => {
            const rect = element.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            tooltip.style.opacity = '1';
        });
        
        element.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });
    });
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}